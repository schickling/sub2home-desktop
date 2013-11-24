define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
], ($, _, Backbone, notificationcenter, ArticleTemplate) ->

  ItemBaseView = Backbone.View.extend

    className: ""
    events:
      "click .bEye": "_toggleIsActive"
      "focusout input": "_updateCustomPrice"
      "click .bReset": "_resetCustomPrice"

    template: null

    initialize: ->
      @_render()
      @model.on "renderAgain", @_render, this

    _render: ->
      json =
        title: @model.get("title")
        price: @model.get("customPrice")
        info: @model.get("info")
        isActive: @model.get("isActive")
        buyed: @model.get("buyed")
        image: @model.get("smallImage")
        priceDiffers: @model.get("customPrice") isnt @model.get("price")

      @$el.html @template(json)
      @$el.toggleClass "inactive", not @model.get("isActive")

    _toggleIsActive: ->
      itemModel = @model
      $eye = @$(".bEye")
      $el = @$el
      isActive = not @model.get("isActive")
      itemModel.set "isActive", isActive
      itemModel.save {},
        success: ->
          $eye.toggleClass "open", isActive
          $el.toggleClass "inactive", not isActive
          if isActive
            notificationcenter.notify "views.store.assortment.items.success.isActive"
          else
            notificationcenter.notify "views.store.assortment.items.success.isNotActive"

        error: ->
          notificationcenter.notify "views.store.assortment.items.error"
          itemModel.set "isActive", not isActive

    _updateCustomPrice: ->
      $input = @$(".pricetag input")
      customPrice = parseFloat($input.val())
      @model.save customPrice: customPrice,
        success: =>
          notificationcenter.notify "views.store.assortment.items.success.price"
          @_render() # rerender for reset button
        error: ->
          notificationcenter.notify "views.store.assortment.items.error"

    _resetCustomPrice: ->
      $input = @$(".pricetag input")
      $input.val @model.get("price")
      @_updateCustomPrice()

