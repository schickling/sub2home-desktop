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
      _.each @collection.models, ((menuUpgradeModel) ->

        # check if price reset is needed
        if menuUpgradeModel.get("price") isnt menuUpgradeModel.get("customPrice")
          @_updateModel menuUpgradeModel,
            customPrice: menuUpgradeModel.get("price")

      ), this
      @_updateLoadBar()

