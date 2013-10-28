define(["jquery", "underscore", "backbone", "models/ArticleModel", "text!templates/store/selection/stage/articleSelection/MenuComponentOptionArticleTemplate.html"], function($, _, Backbone, ArticleModel, MenuComponentOptionArticleTemplate) {
  var MenuComponentOptionArticleView;
  return MenuComponentOptionArticleView = Backbone.View.extend({
    className: "article",
    template: _.template(MenuComponentOptionArticleTemplate),
    events: {
      click: "_select"
    },
    initialize: function() {
      this.orderedArticleModel = this.options.orderedArticleModel;
      this._render();
      this.listenTo(this.model, "change:isSelected", this._update);
      this._update();
      return this._listenForDestory();
    },
    _render: function() {
      var json;
      json = {
        title: this.model.get("title"),
        image: this.model.get("largeImage"),
        deposit: this.model.get("deposit") * 100,
        description: this.model.get("description")
      };
      this.$el.html(this.template(json));
      return this.$el.addClass(this._getImageClass());
    },
    _getImageClass: function() {
      var image, imageWithoutFileExtension;
      image = this.model.get("largeImage");
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."));
      return imageWithoutFileExtension.split("-").pop() || "";
    },
    _update: function() {
      return this.$el.toggleClass("selected", this.model.get("isSelected"));
    },
    _select: function() {
      var newArticleModel, oldArticleModel,
        _this = this;
      if (!this.options.selectionView.clickLocked) {
        this.options.selectionView.clickLocked = true;
        oldArticleModel = this.orderedArticleModel.get("articleModel");
        newArticleModel = new ArticleModel({
          id: this.model.get("id")
        });
        this.model.set({
          isSelected: true
        }, {
          silent: true
        });
        this._update();
        return newArticleModel.fetch({
          success: function() {
            var newIngredientCategoriesCollection, oldIngredientCategoriesCollection;
            if (oldArticleModel !== null) {
              newIngredientCategoriesCollection = newArticleModel.get("ingredientCategoriesCollection");
              oldIngredientCategoriesCollection = oldArticleModel.get("ingredientCategoriesCollection");
              if (newIngredientCategoriesCollection && oldIngredientCategoriesCollection) {
                newIngredientCategoriesCollection.each(function(newIngredientCategoryModel) {
                  var newIngredientsCollection, oldIngredientCategoryModel, oldIngredientsCollection;
                  oldIngredientCategoryModel = oldIngredientCategoriesCollection.find(function(oldIngredientCategoryModel) {
                    return oldIngredientCategoryModel.get("title") === newIngredientCategoryModel.get("title");
                  });
                  if (oldIngredientCategoryModel) {
                    newIngredientsCollection = newIngredientCategoryModel.get("ingredientsCollection");
                    oldIngredientsCollection = oldIngredientCategoryModel.get("ingredientsCollection");
                    return newIngredientsCollection.each(function(newIngredientModel) {
                      var oldIngredientModel;
                      oldIngredientModel = oldIngredientsCollection.find(function(oldIngredientModel) {
                        return oldIngredientModel.get("id") === newIngredientModel.get("id");
                      });
                      return newIngredientModel.set("isSelected", oldIngredientModel && oldIngredientModel.get("isSelected"));
                    });
                  }
                });
              }
            }
            _this.orderedArticleModel.set("articleModel", newArticleModel);
            _this.model.trigger("change:isSelected");
            _this.$el.trigger("fetched");
            return setTimeout((function() {
              return _this.options.selectionView.clickLocked = false;
            }), 600);
          },
          error: function() {
            _this.options.selectionView.clickLocked = false;
            return _this.model.set({
              isSelected: true
            }, {
              silent: true
            });
          }
        });
      }
    },
    _listenForDestory: function() {
      return this.options.selectionView.once("destroy", this.stopListening, this);
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionArticleView.js.map
*/