// Filename: src/js/views/home/home/StoresView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'services/notificationcenter',
    'services/gmaps', // returns window.google.maps namespace
    'models/stateModel',
    'views/assets/mapStyles',
    'views/shared/misc/PostalSearchView',
    'views/home/home/StoreView',
    'views/home/home/PromotionView',
    'collections/StoresCollection'
    ], function ($, _, Backbone, router, notificationcenter, gmaps, stateModel, mapStyles, PostalSearchView, StoreView, PromotionView, StoresCollection) {

	"use strict";

	var StoresView = Backbone.View.extend({

		map: null,
		geocoder: null,
		postal: null,

		// deferreds
		mapDeferred: $.Deferred(),
		collectionDeferred: null,

		storeViews: [],
		promotionView: null,
		postalSearchView: null,

		// cached dom
		$homeNote: null,
		$deliveryAreaSelection: null,
		$mapContainer: null,
		$map: null,
		$actingHint: null,

		initialize: function () {
			this._cacheDom();
			this._renderPostalSearchView();
			this._renderPromotionView();
			this._loadStores();
			this._loadMap();
			this._runAndWaitForPostal();
		},

		_cacheDom: function () {
			this.$homeNote = this.$('#homeNote');
			this.$deliveryAreaSelection = this.$homeNote.find('#deliveryAreaSelection');
			this.$mapContainer = this.$('#mapContainer');
			this.$map = this.$mapContainer.find('#map');
			this.$actingHint = this.$mapContainer.find('#actingHint');
		},

		_renderPostalSearchView: function () {
			var self = this;

			this.postalSearchView = new PostalSearchView({
				el: this.$('#locationSelection'),
				newPostalCallback: function (postal) {
					self._newPostalCallback(postal);
				}
			});
		},

		_renderPromotionView: function () {
			this.promotionView = new PromotionView({
				el: this.$('#suggestStore')
			});
		},

		_loadStores: function () {
			this.collection = new StoresCollection();
			this.collectionDeferred = this.collection.fetch();
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

			this.geocoder = new gmaps.Geocoder();

			// wait unitl map is loaded
			var self = this;
			gmaps.event.addListenerOnce(map, 'idle', function () {
				// init geolocation
				self.mapDeferred.resolve();
				gmaps.event.trigger(map, 'resize');
			});
		},

		_runAndWaitForPostal: function (postal) {
			var self = this;

			this.listenTo(this.postalSearchView, 'newPostal', function (postal) {
				$.when(self.mapDeferred, self.collectionDeferred).done(function () {
					self.postal = postal;
					self._lookUpStores();
				});
			});

			this.postalSearchView.run();
		},

		_lookUpStores: function () {
			var storesInRange = this.collection.filterByDeliveryPostal(this.postal),
				numberOfStores = storesInRange.length;

			this._cleanPreviousResults();
			this._adjustProportions();

			if (numberOfStores > 0) {

				if (numberOfStores > 1) {
					notificationcenter.notify('views.home.home.selectStore');
				}

				// render stores
				this._renderStores(storesInRange);

				// render delivery areas
				var matchingDeliveryAreas = this._getMatchingDeliveryAreas(storesInRange);
				if (matchingDeliveryAreas.length > 1) {
					this._renderDeliveryAreas(matchingDeliveryAreas);
					this.postalSearchView.showDeliveryAreaLabel();
					this._showActingHint();
				} else {
					this.postalSearchView.showStoreSelectionLabel();
					matchingDeliveryAreas[0].set('isSelected', true);
					this.storeViews[0].markAvailable();
					this._hideActingHint();
				}

				this._hidePromotionView();

			} else {
				this._hideActingHint();
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
			}, 200);
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
			this._showPromotionView();
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

		_showPromotionView: function () {
			this.promotionView.show();
		},

		_hidePromotionView: function () {
			this.promotionView.hide();
		},

		_showActingHint: function () {
			this.$actingHint.fadeIn(200);
		},

		_hideActingHint: function () {
			this.$actingHint.fadeOut(200);
		},

		destroy: function () {
			this.postalSearchView.destroy();
		}

	});

	return StoresView;

});