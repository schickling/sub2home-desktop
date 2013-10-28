define(["jquery", "underscore", "backbone", "collections/IngredientsCollection", "views/store/selection/info/ingredientsSelection/IngredientView"], function($, _, Backbone, IngredientsCollection, IngredientView) {
  var IngredientsView;
  return IngredientsView = Backbone.View.extend({
    initialize: function() {
      _.each(this.collection.models, (function(ingredientModel) {
        return this.listenTo(ingredientModel, "change:isSelected", this._render);
      }), this);
      this._render();
      return this._listenForDestory();
    },
    _render: function() {
      var activeIngredientModels;
      this.$el.html("");
      activeIngredientModels = this.collection.filter(function(ingredientModel) {
        return ingredientModel.get("isSelected");
      });
      _.each(activeIngredientModels, (function(ingredientModel) {
        return this._renderIngredient(ingredientModel);
      }), this);
      if (this.collection.length > 1) {
        this.$(".ingredient:last").prev().addClass("penultimate");
      }
      return this.$el.parent().toggleClass("unused", activeIngredientModels.length === 0);
    },
    _renderIngredient: function(ingredientModel) {
      var ingredientView;
      ingredientView = new IngredientView({
        model: ingredientModel
      });
      ingredientView.parentView = this;
      return this.$el.append(ingredientView.el);
    },
    _listenForDestory: function() {
      return this.options.selectionView.once("destroy", this.stopListening, this);
    }
  });
});

/*
//@ sourceMappingURL=IngredientsView.js.map
*/