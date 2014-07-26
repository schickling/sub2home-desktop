define [
  "jquery"
  "jqueryLazyload"
  "underscore"
  "backbone"
  "views/store/selection/stage/ingredientsSelection/IngredientView"
], ($, jqueryLazyload, _, Backbone, IngredientView) ->

  IngredientsView = Backbone.View.extend

    #
    #		 * this.model: ingredient category (needed for toggle strategy)
    #
    initialize: ->
      @render()

    render: ->

      # clean old ingredient views
      $ingredients = @$(".ingredients")
      $ingredients.empty()
      _.each @collection.models, ((ingredientModel) ->
        @_renderIngredient ingredientModel
      ), this
      @$el.lazyload()

    _renderIngredient: (ingredientModel) ->
      ingredientView = new IngredientView(model: ingredientModel)
      ingredientView.parentView = this
      @$el.append ingredientView.el

    notifyOtherIngredients: (ingredientModel) ->
      otherIngredients = @collection.without(ingredientModel)
      isSingle = @model.get("isSingle")

      # if only one ingredient allowed disable others
      if isSingle
        _.each otherIngredients, (otherIngredientModel) ->
          otherIngredientModel.set "isSelected", false

