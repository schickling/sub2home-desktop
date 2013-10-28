define(["jquery", "underscore", "backbone", "services/router", "models/stateModel", "views/PageView", "views/store/config/MapView", "views/store/config/StoreInfoView", "views/store/config/DeliveryAreasView", "views/store/config/DeliveryTimesView", "text!templates/store/config/MainTemplate.html"], function($, _, Backbone, router, stateModel, PageView, MapView, StoreInfoView, DeliveryAreasView, DeliveryTimesView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    subViews: {
      mapView: null
    },
    initialize: function() {
      this.model = stateModel.get("storeModel");
      this.model.fetch({
        url: "stores/storeAlias/auth",
        async: false
      });
      this.pageTitle = "Storeeinstellungen " + this.model.get("title") + " - sub2home";
      if (stateModel.clientOwnsThisStore()) {
        return this._render();
      } else {
        return router.navigate("login", {
          trigger: true,
          replace: true
        });
      }
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this.subViews.mapView = new MapView({
        el: this.$("#storeMap"),
        model: this.model.get("addressModel")
      });
      new StoreInfoView({
        el: this.$("#storeInfo"),
        model: this.model
      });
      new DeliveryAreasView({
        el: this.$("#deliveryAreas"),
        collection: this.model.get("deliveryAreasCollection")
      });
      new DeliveryTimesView({
        el: this.$("#deliveryTimes"),
        collection: this.model.get("deliveryTimesCollection")
      });
      return this.append();
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/