define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "services/gmaps", "models/stateModel", "views/assets/mapStyles", "views/shared/misc/PostalSearchView", "views/home/home/StoreView", "views/home/home/PromotionView", "collections/StoresCollection"], function($, _, Backbone, router, notificationcenter, gmaps, stateModel, mapStyles, PostalSearchView, StoreView, PromotionView, StoresCollection) {
  var StoresView;
  return StoresView = Backbone.View.extend({
    map: null,
    geocoder: null,
    postal: null,
    mapDeferred: null,
    collectionDeferred: null,
    storeViews: null,
    promotionView: null,
    postalSearchView: null,
    $homeNote: null,
    $deliveryAreaSelection: null,
    $mapContainer: null,
    $map: null,
    $actingHint: null,
    initialize: function() {
      this.storeViews = [];
      this._cacheDom();
      this._renderPostalSearchView();
      this._renderPromotionView();
      this._loadStores();
      this._loadMap();
      return this._runAndWaitForPostal();
    },
    _cacheDom: function() {
      this.$homeNote = this.$("#homeNote");
      this.$deliveryAreaSelection = this.$homeNote.find("#deliveryAreaSelection");
      this.$mapContainer = this.$("#mapContainer");
      this.$map = this.$mapContainer.find("#map");
      return this.$actingHint = this.$mapContainer.find("#actingHint");
    },
    _renderPostalSearchView: function() {
      return this.postalSearchView = new PostalSearchView({
        el: this.$("#locationSelection")
      });
    },
    _renderPromotionView: function() {
      return this.promotionView = new PromotionView({
        el: this.$("#suggestStore")
      });
    },
    _loadStores: function() {
      this.collection = new StoresCollection();
      return this.collectionDeferred = this.collection.fetch();
    },
    _loadMap: function() {
      var mapOptions,
        _this = this;
      mapOptions = {
        center: new gmaps.LatLng(52.52, 13.4),
        zoom: 13,
        keyboardShortcuts: false,
        disableDefaultUI: true,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        styles: mapStyles,
        mapTypeId: gmaps.MapTypeId.TERRAIN
      };
      this.map = new gmaps.Map(this.$map.get(0), mapOptions);
      this.geocoder = new gmaps.Geocoder();
      this.mapDeferred = $.Deferred();
      return gmaps.event.addListenerOnce(this.map, "idle", function() {
        _this.mapDeferred.resolve();
        return gmaps.event.trigger(_this.map, "resize");
      });
    },
    _runAndWaitForPostal: function(postal) {
      var _this = this;
      this.listenTo(this.postalSearchView, "newPostal", function(postal) {
        return $.when(_this.mapDeferred, _this.collectionDeferred).done(function() {
          _this.postal = postal;
          return _this._lookUpStores();
        });
      });
      return this.postalSearchView.run();
    },
    _lookUpStores: function() {
      var matchingDeliveryAreas, numberOfStores, storesInRange;
      storesInRange = this.collection.filterByDeliveryPostal(this.postal);
      numberOfStores = storesInRange.length;
      this._cleanPreviousResults();
      this._adjustProportions();
      if (numberOfStores > 0) {
        if (numberOfStores > 1) {
          notificationcenter.notify("views.home.home.selectStore");
        }
        this._renderStores(storesInRange);
        matchingDeliveryAreas = this._getMatchingDeliveryAreas(storesInRange);
        if (matchingDeliveryAreas.length > 1) {
          this._renderDeliveryAreas(matchingDeliveryAreas);
          this.postalSearchView.showDeliveryAreaLabel();
          this._showActingHint();
        } else {
          this.postalSearchView.showStoreSelectionLabel();
          matchingDeliveryAreas[0].set("isSelected", true);
          this.storeViews[0].markAvailable();
          this._hideActingHint();
        }
        return this._hidePromotionView();
      } else {
        this._hideActingHint();
        this._noStoresFound();
        return this.postalSearchView.showLocationLabel();
      }
    },
    _cleanPreviousResults: function() {
      this.$deliveryAreaSelection.hide().html("");
      _.each(this.storeViews, function(storeView) {
        return storeView.remove();
      });
      return this.storeViews = [];
    },
    _renderDeliveryAreas: function(deliveryAreaModels) {
      var district, districtToMark, renderedDistricts, self;
      self = this;
      district = void 0;
      districtToMark = void 0;
      renderedDistricts = [];
      _.each(deliveryAreaModels, function(deliveryAreaModel) {
        var $deliveryArea;
        district = deliveryAreaModel.get("district") || deliveryAreaModel.get("city");
        if (!_.contains(renderedDistricts, district)) {
          renderedDistricts.push(district);
          $deliveryArea = $("<span>").text(district);
          self.$deliveryAreaSelection.append($deliveryArea);
          return $deliveryArea.on("click", function() {
            district = $deliveryArea.text();
            $deliveryArea.addClass("selected").siblings().removeClass("selected");
            _.each(deliveryAreaModels, function(deliveryAreaModelToMark) {
              districtToMark = deliveryAreaModelToMark.get("district") || deliveryAreaModelToMark.get("city");
              return deliveryAreaModelToMark.set("isSelected", districtToMark === district);
            });
            _.each(self.storeViews, function(storeView) {
              return storeView.updateView();
            });
            if (self.storeViews.length === 1) {
              return self.storeViews[0].selectStore();
            }
          });
        }
      });
      this._adjustProportions();
      return this.$deliveryAreaSelection.delay(200).fadeIn(200);
    },
    _adjustProportions: function() {
      var containerTop, notePaddingBottom;
      notePaddingBottom = this.$deliveryAreaSelection.height() - 20;
      containerTop = 240 + notePaddingBottom;
      this.$homeNote.stop().animate({
        paddingBottom: notePaddingBottom
      }, 200);
      return this.$mapContainer.stop().animate({
        top: containerTop
      }, 200);
    },
    _renderStores: function(stores) {
      var latLngBounds;
      latLngBounds = new gmaps.LatLngBounds();
      _.each(stores, (function(storeModel) {
        var storeView;
        storeView = new StoreView(storeModel, this);
        latLngBounds.extend(storeView.position);
        return this.storeViews.push(storeView);
      }), this);
      return this._centerMapToBounds(latLngBounds);
    },
    _noStoresFound: function() {
      notificationcenter.notify("views.home.home.noStoresFound", {
        postal: this.postal
      });
      this._centerMapToNotFoundPostal();
      return this._showPromotionView();
    },
    selectStore: function(storeModel) {
      stateModel.set({
        storeAlias: storeModel.get("alias")
      }, {
        silent: true
      });
      stateModel.set("storeModel", storeModel);
      router.navigate(storeModel.get("alias"), true);
      return notificationcenter.hideTooltip();
    },
    _centerMapToBounds: function(latlngbounds) {
      this.map.setCenter(latlngbounds.getCenter());
      return this.map.fitBounds(latlngbounds);
    },
    _centerMapToNotFoundPostal: function() {
      var self;
      self = this;
      return this.geocoder.geocode({
        address: this.postal + ",Germany"
      }, function(results, status) {
        if (status === gmaps.GeocoderStatus.OK) {
          self.map.setZoom(14);
          return self.map.setCenter(results[0].geometry.location);
        }
      });
    },
    _getMatchingDeliveryAreas: function(stores) {
      var matchingDeliveryAreas;
      matchingDeliveryAreas = [];
      _.each(stores, (function(storeModel) {
        var deliveryAreasCollection, filteredDeliveryAreas;
        deliveryAreasCollection = storeModel.get("deliveryAreasCollection");
        filteredDeliveryAreas = deliveryAreasCollection.where({
          postal: this.postal
        });
        return matchingDeliveryAreas = _.union(matchingDeliveryAreas, filteredDeliveryAreas);
      }), this);
      return matchingDeliveryAreas;
    },
    _showPromotionView: function() {
      return this.promotionView.show();
    },
    _hidePromotionView: function() {
      return this.promotionView.hide();
    },
    _showActingHint: function() {
      return this.$actingHint.fadeIn(200);
    },
    _hideActingHint: function() {
      return this.$actingHint.fadeOut(200);
    },
    destroy: function() {
      return this.postalSearchView.destroy();
    }
  });
});
