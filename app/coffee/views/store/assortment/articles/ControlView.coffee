define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ControlBaseView"
], ($, _, Backbone, ControlBaseView) ->

  ControlView = ControlBaseView.extend

    events:
      "click .bReset": "_resetAllPrices"
      "click .showAll": "_showAllArticles"

    _countItems: ->
      numberOfItems = 0
      _.each @collection.models, (categoryModel) ->
        numberOfItems += categoryModel.get("articlesCollection").length

      @numberOfItems = numberOfItems

    _resetAllPrices: ->
      _.each @collection.models, ((categoryModel) ->
        articlesCollection = categoryModel.get("articlesCollection")
        _.each articlesCollection.models, ((articleModel) ->

          # check if price reset is needed
          if articleModel.get("price") isnt articleModel.get("customPrice")
            @_updateModel articleModel,
              customPrice: articleModel.get("price")

        ), this
      ), this
      @_updateLoadBar()

    _showAllArticles: ->
      _.each @collection.models, ((categoryModel) ->
        articlesCollection = categoryModel.get("articlesCollection")
        _.each articlesCollection.models, ((articleModel) ->

          # check if activation needed
          unless articleModel.get("isActive")
            @_updateModel articleModel,
              isActive: true

        ), this
      ), this
      @_updateLoadBar()


