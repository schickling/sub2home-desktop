define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/assortment/ControlBaseView"
], ($, _, Backbone, ControlBaseView) ->

  ControlView = ControlBaseView.extend

    events:
      "click .bReset": "_resetAllPrices"
      "click .showAll": "_showAllMenus"

    _countItems: ->
      @numberOfItems = @collection.length

    _resetAllPrices: ->
      _.each @collection.models, ((menuBundleModel) ->

        # check if price reset is needed
        if menuBundleModel.get("price") isnt menuBundleModel.get("customPrice")
          @_updateModel menuBundleModel,
            customPrice: menuBundleModel.get("price")

      ), this
      @_updateLoadBar()

    _showAllMenus: ->
      _.each @collection.models, ((menuBundleModel) ->

        # check if activation needed
        unless menuBundleModel.get("isActive")
          @_updateModel menuBundleModel,
            isActive: true

      ), this
      @_updateLoadBar()

