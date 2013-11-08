define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ControlBaseView"
], ($, _, Backbone, ControlBaseView) ->

  ControlView = ControlBaseView.extend

    _countItems: ->
      numberOfItems = 0
      _.each @collection.models, (categoryModel) ->
        numberOfItems += categoryModel.get("articlesCollection").length

      @numberOfItems = numberOfItems

    _resetAll: ->
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


