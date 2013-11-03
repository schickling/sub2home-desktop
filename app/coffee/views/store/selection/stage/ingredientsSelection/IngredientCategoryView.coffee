define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/stage/SlideView"
  "views/store/selection/stage/ingredientsSelection/IngredientsView"
], ($, _, Backbone, SlideView, IngredientsView) ->

  IngredientCategoryView = SlideView.extend

    afterInitialize: ->
      
      # add class
      @$el.addClass "ingredientCategory"
      @$el.toggleClass "isSingle", !!@model.get("isSingle")
      
      # render ingredients
      @renderIngredients()

    renderIngredients: ->
      ingredientsView = new IngredientsView(
        collection: @model.get("ingredientsCollection")
        model: @model
        el: @$el
      )

