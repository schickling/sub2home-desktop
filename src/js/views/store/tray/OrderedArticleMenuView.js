define(["jquery", "underscore", "backbone", "text!templates/store/tray/OrderedArticleMenuTemplate.html"], function($, _, Backbone, OrderedArticleMenuTemplate) {
  var OrderedArticleMenuView;
  return OrderedArticleMenuView = Backbone.View.extend({
    template: _.template(OrderedArticleMenuTemplate),
    className: "menuItem",
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title"),
        image: this.model.get("largeImage"),
        info: this.model.get("info"),
        description: this._getDescription()
      };
      this.$el.html(this.template(json));
      return this.$el.addClass(this._getImageClass());
    },
    _getImageClass: function() {
      var image, imageWithoutFileExtension;
      image = this.model.get("largeImage");
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."));
      return imageWithoutFileExtension.split("-").pop();
    },
    _getDescription: function() {
      var description, i, ingredientCategoriesCollection, ingredientModels, ingredientTitle;
      description = this.model.get("description");
      if (this.model.hasIngredients()) {
        ingredientCategoriesCollection = this.model.get("ingredientCategoriesCollection");
        ingredientModels = ingredientCategoriesCollection.getAllSelectedIngredientModels();
        i = 0;
        while (i < ingredientModels.length) {
          ingredientTitle = ingredientModels[i].get("shortTitle");
          if (i > 0) {
            if (i === ingredientModels.length - 1) {
              description += " und " + ingredientTitle;
            } else {
              description += ", " + ingredientTitle;
            }
          } else {
            description = ingredientTitle;
          }
          i++;
        }
      }
      return description;
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticleMenuView.js.map
*/