define [
  "jquery"
  "underscore"
  "backbone"
  "views/client/dashboard/StoreView"
], ($, _, Backbone, StoreView) ->

  StoresView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((storeModel) ->
        @_renderStore storeModel
      ), this

    _renderStore: (storeModel) ->
      storeView = new StoreView(model: storeModel)
      @$el.append storeView.el

