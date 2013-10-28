define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ControlBaseView"
], ($, _, Backbone, ControlBaseView) ->

  ControlView = ControlBaseView.extend

    events:
      "click .bReset": "_resetAllPrices"
      "click .showAll": "_showAllIngredients"

    _countItems: ->
      numberOfItems = 0
      _.each @collection.models, (ingredientCategoryModel) ->
        numberOfItems += ingredientCategoryModel.get("ingredientsCollection").length

      @numberOfItems = numberOfItems

    _resetAllPrices: ->
      _.each @collection.models, ((ingredientCategoryModel) ->
        ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection")
        _.each ingredientsCollection.models, ((ingredient) ->

          # check if price reset is needed
          if ingredient.get("price") isnt ingredient.get("customPrice")
            @_updateModel ingredient,
              customPrice: ingredient.get("price")

        ), this
      ), this
      @_updateLoadBar()

    _showAllIngredients: ->
      _.each @collection.models, ((ingredientCategoryModel) ->
        ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection")
        _.each ingredientsCollection.models, ((ingredientModel) ->

          # check if activation needed
          unless ingredientModel.get("isActive")
            @_updateModel ingredientModel,
              isActive: true

        ), this
      ), this
      @_updateLoadBar()


