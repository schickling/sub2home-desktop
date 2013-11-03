define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/IngredientCategoryTemplate.html"
], ($, _, Backbone, IngredientCategoryTemplate) ->

  IngredientCategoryView = Backbone.View.extend

    className: "ingredientCategory"
    template: _.template(IngredientCategoryTemplate)

    initialize: ->
      @_render()

    _render: ->
      json = title: @model.get("title")
      @$el.html @template(json)
      @_renderIngredients()

    _renderIngredients: ->
      ingredientsCollection = @model.get("ingredientsCollection")
      $ingredients = @$(".ingredients")
      _.each ingredientsCollection.models, (ingredientModel) ->
        $ingredients.append "<span>" + ingredientModel.get("shortcut") + "</span>"


