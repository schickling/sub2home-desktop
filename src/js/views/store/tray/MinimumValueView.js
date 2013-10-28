define(["jquery", "underscore", "backbone", "services/router", "models/cartModel", "text!templates/store/tray/MinimumValueTemplate.html"], function($, _, Backbone, router, cartModel, MinimumValueTemplate) {
  var MinimumValueView;
  return MinimumValueView = Backbone.View.extend({
    template: _.template(MinimumValueTemplate),
    events: {
      click: "_navigateToHome"
    },
    initialize: function() {
      this._render();
      return this.listenTo(cartModel, "change", this._render);
    },
    _render: function() {
      var json;
      json = {
        minimumValue: cartModel.getMinimumValue()
      };
      this.$el.html(this.template(json));
      return this.$el.toggle(!cartModel.isMinimumReached());
    },
    _navigateToHome: function() {
      return router.navigate("store", true);
    },
    destroy: function() {
      return this.stopListening();
    }
  });
});

/*
//@ sourceMappingURL=MinimumValueView.js.map
*/