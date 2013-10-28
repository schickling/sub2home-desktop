define(["jquery", "underscore", "backbone", "text!templates/store/info/DeliveryAreaTemplate.html"], function($, _, Backbone, DeliveryAreaTemplate) {
  var DeliveryAreaView;
  return DeliveryAreaView = Backbone.View.extend({
    template: _.template(DeliveryAreaTemplate),
    className: "infoDeliveryArea",
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        postal: this.model.get("postal"),
        city: this.model.get("city"),
        district: this.model.get("district"),
        minimumDuration: this.model.get("minimumDuration"),
        minimumValue: this.model.get("minimumValue")
      };
      return this.$el.html(this.template(json));
    }
  });
});

/*
//@ sourceMappingURL=DeliveryAreaView.js.map
*/