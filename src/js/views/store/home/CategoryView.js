define(["jquery", "underscore", "backbone", "views/store/home/ItemsView", "text!templates/store/home/CategoryTemplate.html"], function($, _, Backbone, ItemsView, CategoryTemplate) {
  var CategoryView;
  return CategoryView = Backbone.View.extend({
    className: "category",
    template: _.template(CategoryTemplate),
    initialize: function() {
      return this.render();
    },
    render: function() {
      var itemsView, json;
      json = {
        title: this.model.get("title")
      };
      this.$el.html(this.template(json));
      return itemsView = new ItemsView({
        collection: this.model.get("itemsCollection"),
        el: this.$(".items")
      });
    }
  });
});

/*
//@ sourceMappingURL=CategoryView.js.map
*/