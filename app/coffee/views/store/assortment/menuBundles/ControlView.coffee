define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ControlBaseView"
], ($, _, Backbone, ControlBaseView) ->

  ControlView = ControlBaseView.extend

    _countItems: ->
      @numberOfItems = @collection.length

    _resetAll: ->
      _.each @collection.models, ((menuBundleModel) ->

        # check if price reset is needed
        if menuBundleModel.get("price") isnt menuBundleModel.get("customPrice")
          @_updateModel menuBundleModel,
            customPrice: menuBundleModel.get("price")

      ), this
      @_updateLoadBar()

