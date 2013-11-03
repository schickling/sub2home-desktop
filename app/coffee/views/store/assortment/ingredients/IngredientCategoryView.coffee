define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ingredients/IngredientsView"
  "text!templates/store/assortment/ingredients/IngredientCategoryTemplate.html"
], ($, _, Backbone, IngredientsView, IngredientCategoryTemplate) ->

  IngredientCategoryView = Backbone.View.extend

    className: "category"
    template: _.template(IngredientCategoryTemplate)

    initialize: ->
      @_render()

    _render: ->
      json = title: @model.get("title")
      @$el.html @template(json)
      @_renderIngredients()

    _renderIngredients: ->
      new IngredientsView(
        el: @$(".ingredients")
        collection: @model.get("ingredientsCollection")
      )

