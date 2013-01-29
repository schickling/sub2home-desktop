// Filename: src/js/views/home/StoresView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'notificationcenter',
	'gmaps', // returns window.google.maps namespace
	'models/stateModel',
	'views/home/mapStyles',
	'views/home/StoreView',
	'collections/StoresCollection'
	], function ($, _, Backbone, router, notificationcenter, gmaps, stateModel, mapStyles, StoreView, StoresCollection) {

	var StoresView = Backbone.View.extend({

		postal: 0,

		map: null,

		// deffereds
		mapDeffered: $.Deferred(),
		collectionDeffered: null,

		storeViews: [],

		// cached dom
		$search: null,
		$map: null,

		initialize: function () {

			this.cacheDom();

			this.loadStores();
			this.loadMap();

			this.checkLocation();

		},

		cacheDom: function () {
			//  search input
			this.$search = this.$('#locationSelectionInput');

			this.$deliveryAreaSelection = this.$('.deliveryAreaSelection');

			this.$map = this.$('#map');
		},

		loadStores: function () {
			this.collection = new StoresCollection();
			this.collectionDeffered = this.collection.fetch();
		},

		loadMap: function () {

			var mapOptions = {
				center: new gmaps.LatLng(52.52, 13.4),
				// Berlin
				zoom: 13,
				keyboardShortcuts: false,
				disableDefaultUI: true,
				draggable: false,
				disableDoubleClickZoom: true,
				scrollwheel: false,
				styles: mapStyles,
				mapTypeId: gmaps.MapTypeId.TERRAIN
			};

			var map = this.map = new gmaps.Map(this.$map.get(0), mapOptions);

			// initialize geocoder
			this.geocoder = new gmaps.Geocoder();

			// wait unitl map is loaded
			var self = this;
			gmaps.event.addListenerOnce(map, 'idle', function () {
				// init geolocation
				self.mapDeffered.resolve();
				gmaps.event.trigger(map, 'resize');
			});

		},

		checkLocation: function () {
			if (navigator.geolocation) {
				var self = this;

				// wait for collection fetched and maps loaded
				$.when(this.mapDeffered, this.collectionDeffered).done(function () {
					navigator.geolocation.getCurrentPosition(function (position) {

						self.$search.val('Standort wird ermittelt');

						var latlng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);

						self.geocoder.geocode({
							latLng: latlng
						}, function (results, status) {
							if (status == gmaps.GeocoderStatus.OK) {
								var postal = 0;

								// parse results for postal
								for (i = 0; i < results[0].address_components.length; i++) {
									for (j = 0; j < results[0].address_components[i].types.length; j++) {
										if (results[0].address_components[i].types[j] == "postal_code") {
											postal = results[0].address_components[i].long_name;
											break;
										}
									}
								}


								// write postal back to search field
								self.$search.val(postal);

								self.lookUpStoresForPostal(postal, false);

							} else {
								self.$search.val('wtf');
							}
						});
					}, function () {
						notificationcenter.warning('Neeeeeeeeein!', 'Standort konnte nicht ermittelt werden');
					});
				}); // end deffered
			}
		},

		lookUpStoresForPostal: function (postal) {

			// set postal
			this.postal = parseInt(postal, 10);

			var storesInRange = this.collection.filterByDeliveryPostal(this.postal),
				numberOfStores = storesInRange.length;

			if (numberOfStores > 0) {

				this.cleanPreviousResults();

				if (numberOfStores > 1) {
					this.selectStoreNotification();
				}

				// render delivery areas
				var matchingDeliveryAreas = this.getMatchingDeliveryAreas(storesInRange);
				if (matchingDeliveryAreas.length > 1) {
					this.renderDeliveryAreas(matchingDeliveryAreas);
				} else {
					console.log('nur ein liefergebiet');
				}

				this.renderStores(storesInRange);

			} else {
				this.noStoresFound();
			}
		},

		cleanPreviousResults: function () {
			// delete old delivery areas
			this.$deliveryAreaSelection.html('');

			// destroy old store views
			_.each(this.storeViews, function (storeView) {
				storeView.remove();
			});
			this.storeViews = [];
		},

		renderDeliveryAreas: function (deliveryAreas) {
			var self = this,
				renderedDescriptions = [];

			// render new areas
			_.each(deliveryAreas, function (deliveryAreaModel) {
				var description = deliveryAreaModel.get('description');

				if (!_.contains(renderedDescriptions, description)) {
					renderedDescriptions.push(description);

					var $deliveryArea = $('<span>').text(description);

					// append to list
					self.$deliveryAreaSelection.append($deliveryArea);

					// bind dom click handler
					$deliveryArea.on('click', function () {

						// mark dom visited
						$deliveryArea.addClass('selected').siblings().removeClass('selected');

						// mark delivery areas
						_.each(deliveryAreas, function (deliveryAreaModelToMark) {
							deliveryAreaModelToMark.set('selected', deliveryAreaModelToMark.get('description') === description);
						});

						// update storeviews
						_.each(self.storeViews, function (storeView) {
							storeView.updateView();
						});

					});

				}
			});

		},

		renderStores: function (stores) {



			var latLngBounds = new gmaps.LatLngBounds();

			_.each(stores, function (storeModel) {
				var storeView = new StoreView(storeModel, this);
				latLngBounds.extend(storeView.position);
				this.storeViews.push(storeView);
			}, this);

			this.centerMapToBounds(latLngBounds);

		},

		redirect: function (storeModel) {

			// adjust store alias without notifying
			// (stateModel gets saved through storeModel change)
			stateModel.set({
				storeAlias: storeModel.get('alias')
			}, {
				silent: true
			});

			// set store model
			stateModel.set('storeModel', storeModel);

			router.navigate(storeModel.get('alias'), true);
		},

		noStoresFound: function () {
			notificationcenter.warning('Kein Store gefunden', 'Schade sowas gibts nicht in ' + this.postal);

			this.centerMapToNotFoundPostal();
		},

		selectStoreNotification: function () {

			notificationcenter.info('Entscheide dich', 'Entscheide dich fuer einen tollen Store');

		},

		/*
		 * Helper functions
		 */

		centerMapToBounds: function (latlngbounds) {
			this.map.setCenter(latlngbounds.getCenter());
			this.map.fitBounds(latlngbounds);
		},

		centerMapToNotFoundPostal: function () {
			var self = this;


			this.geocoder.geocode({
				'address': this.postal + ',Germany'
			}, function (results, status) {
				if (status == gmaps.GeocoderStatus.OK) {
					self.map.setZoom(14);
					self.map.setCenter(results[0].geometry.location);
				}
			});
		},

		getMatchingDeliveryAreas: function (stores) {
			var matchingDeliveryAreas = [];

			_.each(stores, function (storeModel) {

				var deliveryAreasCollection = storeModel.get('deliveryAreasCollection'),
					filteredDeliveryAreas = deliveryAreasCollection.where({
						postal: this.postal
					});

				matchingDeliveryAreas = _.union(matchingDeliveryAreas, filteredDeliveryAreas);

			}, this);

			return matchingDeliveryAreas;
		}

	});

	return StoresView;

});