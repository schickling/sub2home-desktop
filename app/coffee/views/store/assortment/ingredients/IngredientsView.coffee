define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ingredients/IngredientView"
], ($, _, Backbone, IngredientView) ->

  IngredientsView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((ingredientModel) ->
        @_renderIngredient ingredientModel
      ), this

    _renderIngredient: (ingredientModel) ->
      ingredientView = new IngredientView(model: ingredientModel)
      @$el.append ingredientView.el

