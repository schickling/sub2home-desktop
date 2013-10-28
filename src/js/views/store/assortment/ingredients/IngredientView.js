define(["jquery", "underscore", "backbone", "views/store/assortment/ItemBaseView", "text!templates/store/assortment/ingredients/IngredientTemplate.html"], function($, _, Backbone, ItemBaseView, IngredientTemplate) {
  var IngredientView;
  return IngredientView = ItemBaseView.extend({
    template: _.template(IngredientTemplate),
    className: "ingredient"
  });
});

/*
//@ sourceMappingURL=IngredientView.js.map
*/