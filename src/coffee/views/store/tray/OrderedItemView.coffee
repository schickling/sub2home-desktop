define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "views/store/tray/OrderedArticleSingleView"
  "views/store/tray/OrderedMenuView"
], ($, _, Backbone, router, notificationcenter, OrderedArticleSingleView, OrderedMenuView) ->

  OrderedItemView = Backbone.View.extend

    className: "orderedItem"

    events:
      "click .deleteItem": "_destroy"
      "click .itemPreview": "_edit"
      "click .addItem": "_increaseAmount"
      "click .increaseAmount": "_increaseAmount"
      "click .decreaseAmount": "_decreaseAmount"

    initialize: ->
      @_render()

    _render: ->
      if @model.isMenu()
        @_renderOrderedMenu()
      else
        @_renderOrderedArticleSingle()

    _renderOrderedMenu: ->
      orderedMenuView = new OrderedMenuView(
        model: @model
        el: @$el
      )

    _renderOrderedArticleSingle: ->
      orderedArticleSingleView = new OrderedArticleSingleView(
        model: @model
        el: @$el
      )

    _destroy: ->
      self = this
      if @model.collection.length is 1
        notificationcenter.notify "views.store.tray.cartNowEmpty"
        router.navigate "store",
          trigger: true
          replace: true

      @model.destroy()
      self.$el.fadeOut ->
        self.remove()

    _edit: ->
      router.navigate "store/theke/aendern/" + @model.get("id"), true  if @model.isEditable()

    _increaseAmount: ->
      @model.set "amount", @model.get("amount") + 1
      @_render()

    _decreaseAmount: ->
      @model.set "amount", @model.get("amount") - 1
      @_render()

