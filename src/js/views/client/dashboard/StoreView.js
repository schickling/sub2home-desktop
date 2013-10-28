define(["jquery", "underscore", "backbone", "moment", "services/router", "text!templates/client/dashboard/StoreTemplate.html"], function($, _, Backbone, moment, router, StoreTemplate) {
  var StoreView;
  return StoreView = Backbone.View.extend({
    template: _.template(StoreTemplate),
    className: "clientStore",
    events: {
      click: "_navigate"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var currentMoment, invoicesCollection, json;
      invoicesCollection = this.model.get("invoicesCollection");
      currentMoment = moment();
      json = {
        title: this.model.get("title"),
        month: currentMoment.format("MMMM"),
        year: currentMoment.format("YYYY"),
        total: parseInt(invoicesCollection.getTotalOfCurrentMonth(), 10),
        numberOfUndoneOrders: this.model.get("numberOfUndoneOrders")
      };
      return this.$el.html(this.template(json));
    },
    _navigate: function() {
      return router.navigate(this.model.get("alias") + "/dashboard", true);
    }
  });
});

/*
//@ sourceMappingURL=StoreView.js.map
*/