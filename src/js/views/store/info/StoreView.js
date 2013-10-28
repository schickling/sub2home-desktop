define(["jquery", "underscore", "backbone", "views/store/info/DeliveryTimesView", "views/store/info/DeliveryAreasView", "text!templates/store/info/StoreTemplate.html"], function($, _, Backbone, DeliveryTimesView, DeliveryAreasView, StoreTemplate) {
  var StoreView;
  return StoreView = Backbone.View.extend({
    template: _.template(StoreTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var addressModel, json, storeModel;
      storeModel = this.model;
      addressModel = storeModel.get("addressModel");
      json = {
        title: storeModel.get("title"),
        phone: addressModel.get("phone"),
        street: addressModel.get("street"),
        streetNumber: addressModel.get("streetNumber"),
        postal: addressModel.get("postal"),
        city: addressModel.get("city"),
        email: addressModel.get("email"),
        facebookUrl: storeModel.get("facebookUrl")
      };
      this.$el.html(this.template(json));
      this._renderDeliveryTimes();
      this._renderDeliveryAreas();
      return this._markPaymentMethods();
    },
    _renderDeliveryTimes: function() {
      return new DeliveryTimesView({
        el: this.$("#infoDeliveryTimes"),
        collection: this.model.get("deliveryTimesCollection")
      });
    },
    _renderDeliveryAreas: function() {
      return new DeliveryAreasView({
        el: this.$("#infoDeliveryAreas"),
        collection: this.model.get("deliveryAreasCollection")
      });
    },
    _markPaymentMethods: function() {
      var $paymentMethods, paymentMethods;
      paymentMethods = ["cash", "ec"];
      $paymentMethods = this.$("#paymentMethods").find(".threeColumn");
      return _.each(paymentMethods, (function(paymentMethod) {
        var capitalizedPaymentMethod, storeAllowsPaymentMethod;
        capitalizedPaymentMethod = paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1);
        storeAllowsPaymentMethod = this.model.get("allowsPayment" + capitalizedPaymentMethod);
        if (!storeAllowsPaymentMethod) {
          return $paymentMethods.filter("." + paymentMethod).addClass("inactive");
        }
      }), this);
    }
  });
});

/*
//@ sourceMappingURL=StoreView.js.map
*/