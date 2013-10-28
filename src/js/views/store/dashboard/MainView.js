define(["jquery", "underscore", "backbone", "services/router", "models/stateModel", "views/PageView", "views/store/dashboard/OrdersView", "views/store/dashboard/revenues/RevenuesView", "text!templates/store/dashboard/MainTemplate.html"], function($, _, Backbone, router, stateModel, PageView, OrdersView, RevenuesView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    subViews: {
      ordersView: null
    },
    template: _.template(MainTemplate),
    initialize: function() {
      this.model = stateModel.get("storeModel");
      this.model.fetch({
        url: "stores/storeAlias/auth",
        async: false
      });
      this.pageTitle = "Bestellungen&Umsätze " + this.model.get("title") + " - sub2home";
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
      var json;
      json = {
        title: this.model.get("title")
      };
      this.$el.html(this.template(json));
      this._renderOrders();
      this.append();
      return this._renderRevenues();
    },
    _renderOrders: function() {
      return this.subViews.ordersView = new OrdersView({
        el: this.$el
      });
    },
    _renderRevenues: function() {
      return new RevenuesView({
        el: this.$("#revenuesNote"),
        collection: this.model.get("invoicesCollection")
      });
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/