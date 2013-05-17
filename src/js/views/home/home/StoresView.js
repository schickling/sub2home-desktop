// Filename: src/js/views/home/home/StoresView.js
define([
    'jquery',
    'jqueryRotate',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'gmaps', // returns window.google.maps namespace
    'models/stateModel',
    'views/assets/mapStyles',
    'views/home/home/StoreView',
    'collections/StoresCollection'
    ], function ($, jqueryRotate, _, Backbone, router, notificationcenter, gmaps, stateModel, mapStyles, StoreView, StoresCollection) {

	var StoresView = Backbone.View.extend({

		postal: 0,

		map: null,

		// deffereds
		mapDeffered: $.Deferred(),
		collectionDeffered: null,

		storeViews: [],

		rotateInterval: null,

		userInteractionTookPlace: false,

		events: {
			'keyup #locationSelectionInput': '_checkInputKeyUp',
			'keydown #locationSelectionInput': '_checkInputKeyDown'
		},

		// cached dom
		$homeNote: null,
		$search: null,
		$deliveryAreaSelection: null,
		$locationLoader: null,
		$location: null,
		$locationNotice: null,
		$locationLabel: null,
		$deliveryAreaLabel: null,
		$storeSelectionLabel: null,
		$mapContainer: null,
		$map: null,

		initialize: function () {

			this._cacheDom();

			this._loadStores();
			this._loadMap();

			this._checkLocation();

		},

		_cacheDom: function () {
			this.$homeNote = this.$('#homeNote');
			this.$search = this.$homeNote.find('#locationSelectionInput');
			this.$deliveryAreaSelection = this.$homeNote.find('#deliveryAreaSelection');
			this.$locationLoader = this.$homeNote.find('#locationLoader');
			this.$location = this.$locationLoader.find('#location');
			this.$locationNotice = this.$homeNote.find('#locationNotice'); // ?
			this.$locationLabel = this.$homeNote.find('#locationLabel');
			this.$deliveryAreaLabel = this.$homeNote.find('#deliveryAreaLabel');
			this.$storeSelectionLabel = this.$homeNote.find('#storeSelectionLabel');
			this.$mapContainer = this.$('#mapContainer');
			this.$map = this.$mapContainer.find('#map');
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
				this._startRotateLocation();

				// wait for collection fetched and maps loaded
				$.when(this.mapDeffered, this.collectionDeffered).done(function () {
					navigator.geolocation.getCurrentPosition(function (position) {

						var latlng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);

						self.geocoder.geocode({
							latLng: latlng
						}, function (results, status) {

							if (!self.userInteractionTookPlace) {

								// stop location rotation
								self._stopAndHideRotateLocation();

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

									self._unfocusSearch();

									self._lookUpStoresForPostal(postal, false);

								} else {
									notificationcenter.notify('views.home.home.lookupFailed');
									self._focusSearch();
								}

							}
						});
					}, function () {
						notificationcenter.notify('views.home.home.lookupFailed');
						self._stopAndHideRotateLocation();
						self._focusSearch();
					}, {
						timeout: 10000
					});
				}); // end deffered
			} else {
				this._focusSearch();
			}
		},

		_focusSearch: function () {
			this.$search.focus();
		},

		_unfocusSearch: function () {
			this.$search.blur();
		},

		_checkInputKeyUp: function (e) {
			var input = e.target.value,
				postal = parseInt(input, 10);

			if (postal > 9999) {
				this._lookUpStoresForPostal(postal);
			}
		},

		_checkInputKeyDown: function (e) {

			this._showLocationLabel();

			// stop location automation on user interaction
			this._stopLocationDetermination();

			var val = e.target.value,
				offset, tooltipTop, tooltipLeft;

			// show tooltip on wrong input
			if (e.keyCode < 48 || e.keyCode > 57) { // Ensure that it is a number
				if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 13 || // Allow backspace, delete and enter
				e.keyCode > 95 && e.keyCode < 106 || // allow numblock
				e.keyCode > 36 && e.keyCode < 41) { // allow arrow keys
					notificationcenter.hideTooltip();
				} else {
					offset = this.$search.offset();
					tooltipTop = offset.top + 72;
					tooltipLeft = window.innerWidth * 0.5 + val.length * 32; // offset for each letter
					notificationcenter.tooltip('views.home.home.input', tooltipTop, tooltipLeft);
					return false;
				}
			} else if (val.length > 4) {
				return false;
			} else {
				notificationcenter.hideTooltip();
			}
		},

		_stopLocationDetermination: function () {
			if (!this.userInteractionTookPlace) {
				this._stopAndHideRotateLocation();
				this.userInteractionTookPlace = true;
			}
		},

		_lookUpStoresForPostal: function (postal) {

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
					this._showDeliveryAreaLabel();
				} else {
					this._showStoreSelectionLabel();
					matchingDeliveryAreas[0].set('isSelected', true);
					this.storeViews[0].markAvailable();
				}

				this._unfocusSearch();

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

		_showDeliveryAreaLabel: function () {
			this.$locationLabel.stop().fadeOut(100);
			this.$storeSelectionLabel.stop().fadeOut(100);
			this.$deliveryAreaLabel.stop().delay(100).fadeIn(150);
		},

		_showLocationLabel: function () {
			this.$deliveryAreaLabel.stop().fadeOut(100);
			this.$storeSelectionLabel.stop().fadeOut(100);
			this.$locationLabel.stop().delay(100).fadeIn(150);
		},

		_showStoreSelectionLabel: function () {
			this.$deliveryAreaLabel.stop().fadeOut(100);
			this.$locationLabel.stop().fadeOut(100);
			this.$storeSelectionLabel.stop().delay(100).fadeIn(150);
		},

		_renderDeliveryAreas: function (deliveryAreaModels) {

			var self = this,
				district, districtToMark,
				renderedDistricts = [];

			// render new areas
			_.each(deliveryAreaModels, function (deliveryAreaModel) {
				district = deliveryAreaModel.get('district') || deliveryAreaModel.get('city');

				if (!_.contains(renderedDistricts, district)) {
					renderedDistricts.push(district);

					var $deliveryArea = $('<span>').text(district);

					// append to list
					self.$deliveryAreaSelection.append($deliveryArea);

					// bind dom click handler
					$deliveryArea.on('click', function () {

						district = $deliveryArea.text();

						// mark dom visited
						$deliveryArea.addClass('selected').siblings().removeClass('selected');

						// mark delivery areas
						_.each(deliveryAreaModels, function (deliveryAreaModelToMark) {
							districtToMark = deliveryAreaModelToMark.get('district') || deliveryAreaModelToMark.get('city');
							deliveryAreaModelToMark.set('isSelected', districtToMark === district);
						});

						// update storeviews
						_.each(self.storeViews, function (storeView) {
							storeView.updateView();
						});

						// TODO rewrite
						if (self.storeViews.length === 1) {
							self.storeViews[0].selectStore();
						}

					});


				}
			});

			this._adjustProportions();
			this.$deliveryAreaSelection.delay(200).fadeIn(200);

		},

		_adjustProportions: function () {
			var notePaddingBottom = this.$deliveryAreaSelection.height() - 20,
				containerTop = 240 + notePaddingBottom;

			this.$homeNote.stop().animate({
				paddingBottom: notePaddingBottom
			}, 200);

			this.$mapContainer.stop().animate({
				top: containerTop
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

			this._focusSearch();
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

			// remove remaining tooltip
			notificationcenter.hideTooltip();

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
		},

		_startRotateLocation: function () {

			var $location = this.$location,
				deg = 0;

			this.rotateInterval = setInterval(function () {
				deg = (deg + 5) % 180;
				$location.rotate(deg);
			}, 20);
		},

		_stopAndHideRotateLocation: function () {

			clearInterval(this.rotateInterval);

			this.$locationLoader.fadeOut(150);
			this.$locationNotice.fadeOut(150);

			this.$locationLabel.delay(140).animate({
				marginLeft: -174
			});

		},

		destroy: function () {
			this._stopLocationDetermination();
		}

	});

	return StoresView;

});