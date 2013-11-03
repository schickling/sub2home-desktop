define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/ingredientsSelection/IngredientsView"
  "text!templates/store/selection/info/ingredientsSelection/IngredientCategoryTemplate.html"
], ($, _, Backbone, IngredientsView, IngredientCategoryTemplate) ->

  IngredientCategoryView = Backbone.View.extend

    className: "ingredientCategory"

    template: _.template(IngredientCategoryTemplate)

    initialize: ->
      @_render()

    _render: ->
      json = title: @model.get("title")
      @$el.html @template(json)
      ingredientsView = new IngredientsView(
        collection: @model.get("ingredientsCollection")
        el: @$(".ingredients")
        selectionView: @options.selectionView
        model: @model
      )

