define(["jquery", "underscore", "backbone", "views/store/dashboard/details/OrderedArticlesView", "text!templates/store/dashboard/details/OrderedItemTemplate.html"], function($, _, Backbone, OrderedArticlesView, OrderedItemTemplate) {
  var OrderedItemView;
  return OrderedItemView = Backbone.View.extend({
    className: "orderedItem",
    template: _.template(OrderedItemTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var amount, json;
      amount = this.model.get("amount");
      json = {
        amount: amount,
        total: this.model.get("total") / amount,
        isMenu: false,
        menuTitle: "Spar Menu"
      };
      this.$el.html(this.template(json));
      return this._renderOrderedArticles();
    },
    _renderOrderedArticles: function() {
      return new OrderedArticlesView({
        el: this.$(".orderedArticles"),
        collection: this.model.get("orderedArticlesCollection")
      });
    }
  });
});

/*
//@ sourceMappingURL=OrderedItemView.js.map
*/