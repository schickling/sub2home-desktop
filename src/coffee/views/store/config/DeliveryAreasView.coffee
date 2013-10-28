define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/DeliveryAreaModel"
  "views/store/config/DeliveryAreaView"
], ($, _, Backbone, notificationcenter, DeliveryAreaModel, DeliveryAreaView) ->
 
  DeliveryAreasView = Backbone.View.extend

    events:
      "click .bAdd": "_addDeliveryArea"

    
    # cached dom
    $configContent: null
    initialize: ->
      @_cacheDom()
      @_render()

    _cacheDom: ->
      @$configContent = @$(".configContent")

    _render: ->
      _.each @collection.models, ((item) ->
        @_renderDeliveryArea item
      ), this

    _renderDeliveryArea: (item) ->
      deliveryAreaView = new DeliveryAreaView(model: item)
      @$configContent.append deliveryAreaView.el

    _addDeliveryArea: ->
      self = this
      @collection.create {},
        validate: false
        success: (deliveryAreaModel) ->
          notificationcenter.notify "views.store.config.deliveryArea.add.success"
          self._renderDeliveryArea deliveryAreaModel

        error: ->
          notificationcenter.notify "views.store.config.deliveryArea.add.error"

