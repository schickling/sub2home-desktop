define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ItemBaseView"
  "text!templates/store/assortment/ingredients/IngredientTemplate.html"
], ($, _, Backbone, ItemBaseView, IngredientTemplate) ->

  IngredientView = ItemBaseView.extend

    template: _.template(IngredientTemplate)

    className: "ingredient"


