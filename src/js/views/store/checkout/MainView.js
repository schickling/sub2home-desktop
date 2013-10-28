define(["jquery", "underscore", "backbone", "services/router", "models/cartModel", "views/PageView", "views/store/checkout/CountdownView", "text!templates/store/checkout/MainTemplate.html"], function($, _, Backbone, router, cartModel, PageView, CountdownView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    pageTitle: "Danke für Deine Bestellung - sub2home",
    subViews: {
      countdownView: null
    },
    initialize: function() {
      if (cartModel.get("isClosed")) {
        return this.render();
      } else {
        return router.navigate("store", {
          trigger: true,
          replace: true
        });
      }
    },
    render: function() {
      this.$el.html(MainTemplate);
      this.countdownView = new CountdownView({
        el: this.$("#checkoutNote")
      });
      return this.append();
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/