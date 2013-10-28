define(["jquery", "underscore", "backbone", "collections/CategoriesCollection", "views/store/home/CategoryView"], function($, _, Backbone, CategoriesCollection, CategoryView) {
  var CategoriesView;
  return CategoriesView = Backbone.View.extend({
    deffered: null,
    initialize: function() {
      var self;
      self = this;
      this.collection = new CategoriesCollection();
      return this.deffered = this.collection.fetch({
        parse: true,
        success: function() {
          return self.render();
        }
      });
    },
    render: function() {
      return _.each(this.collection.models, (function(categoryModel) {
        return this.renderCategory(categoryModel);
      }), this);
    },
    renderCategory: function(categoryModel) {
      var categoryView;
      categoryView = new CategoryView({
        model: categoryModel
      });
      return this.$el.append(categoryView.el);
    }
  });
});

/*
//@ sourceMappingURL=CategoriesView.js.map
*/