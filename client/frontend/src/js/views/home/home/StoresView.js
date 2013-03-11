// Filename: src/js/views/home/home/StoresView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'gmaps', // returns window.google.maps namespace
    'models/stateModel',
    'views/assets/mapStyles',
    'views/home/home/StoreView',
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

			this._cacheDom();

			this._loadStores();
			this._loadMap();

			this._checkLocation();

		},

		_cacheDom: function () {
			//  search input
			this.$search = this.$('#locationSelectionInput');

			this.$deliveryAreaSelection = this.$('.deliveryAreaSelection');

			this.$map = this.$('#map');
		},

		_loadStores: function () {
			this.collection = new StoresCollection();
			this.collectionDeffered = this.collection.fetch();
		},

		_loadMap: function () {

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

		_checkLocation: function () {
			if (navigator.geolocation) {
				var self = this;

				notificationcenter.notify('views.home.home.lookupLocation');

				// wait for collection fetched and maps loaded
				$.when(this.mapDeffered, this.collectionDeffered).done(function () {
					navigator.geolocation.getCurrentPosition(function (position) {

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
								notificationcenter.notify('views.home.home.lookupFailed');
							}
						});
					}, function () {
						notificationcenter.notify('views.home.home.lookupFailed');
					});
				}); // end deffered
			}
		},

		lookUpStoresForPostal: function (postal) {

			// set postal
			this.postal = parseInt(postal, 10);

			var storesInRange = this.collection.filterByDeliveryPostal(this.postal),
				numberOfStores = storesInRange.length;

			this._cleanPreviousResults();

			if (numberOfStores > 0) {

				if (numberOfStores > 1) {
					this._selectStoreNotification();
				}

				// render stores
				this._renderStores(storesInRange);

				// render delivery areas
				var matchingDeliveryAreas = this._getMatchingDeliveryAreas(storesInRange);
				if (matchingDeliveryAreas.length > 1) {
					this._renderDeliveryAreas(matchingDeliveryAreas);
				} else {
					matchingDeliveryAreas[0].set('isSelected', true);
					this.storeViews[0].markAvailable();
				}

			} else {
				this._noStoresFound();
			}
		},

		_cleanPreviousResults: function () {

			// delete old delivery areas
			this.$deliveryAreaSelection.hide().html('');

			// destroy old store views
			_.each(this.storeViews, function (storeView) {
				storeView.remove();
			});
			this.storeViews = [];
		},

		_renderDeliveryAreas: function (deliveryAreas) {
			var self = this,
				district, districtToMark,
				renderedDistricts = [];

			// render new areas
			_.each(deliveryAreas, function (deliveryAreaModel) {
				district = deliveryAreaModel.get('district') || deliveryAreaModel.get('city');

				if (!_.contains(renderedDistricts, district)) {
					renderedDistricts.push(district);

					var $deliveryArea = $('<span>').text(district);

					// append to list
					self.$deliveryAreaSelection.append($deliveryArea);

					// bind dom click handler
					$deliveryArea.on('click', function () {

						// mark dom visited
						$deliveryArea.addClass('selected').siblings().removeClass('selected');

						// mark delivery areas
						_.each(deliveryAreas, function (deliveryAreaModelToMark) {
							districtToMark = deliveryAreaModelToMark.get('district') || deliveryAreaModelToMark.get('city');
							deliveryAreaModelToMark.set('isSelected', districtToMark === district);
						});

						// update storeviews
						_.each(self.storeViews, function (storeView) {
							storeView.updateView();
						});

					});

					self.$deliveryAreaSelection.fadeIn(150);

				}
			});

		},

		_renderStores: function (stores) {

			var latLngBounds = new gmaps.LatLngBounds();

			_.each(stores, function (storeModel) {
				var storeView = new StoreView(storeModel, this);
				latLngBounds.extend(storeView.position);
				this.storeViews.push(storeView);
			}, this);

			this._centerMapToBounds(latLngBounds);

		},

		_noStoresFound: function () {
			notificationcenter.notify('views.home.home.noStoresFound', {
				postal: this.postal
			});

			this._centerMapToNotFoundPostal();
		},

		_selectStoreNotification: function () {

			notificationcenter.notify('views.home.home.selectStore');

		},

		selectStore: function (storeModel) {

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

		/*
		 * Helper functions
		 */

		_centerMapToBounds: function (latlngbounds) {
			this.map.setCenter(latlngbounds.getCenter());
			this.map.fitBounds(latlngbounds);
		},

		_centerMapToNotFoundPostal: function () {
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

		_getMatchingDeliveryAreas: function (stores) {
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