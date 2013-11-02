define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/cartModel"
  "text!templates/store/tray/MinimumValueTemplate.html"
], ($, _, Backbone, router, cartModel, MinimumValueTemplate) ->

  MinimumValueView = Backbone.View.extend

    template: _.template(MinimumValueTemplate)
    events:
      click: "_navigateToHome"

    initialize: ->
      @_render()
      @listenTo cartModel, "change", @_slide

    _render: ->
      json = minimumValue: cartModel.getMinimumValue()
      @$el.html @template(json)
      @$el.toggle not cartModel.isMinimumReached()

    _slide: ->
      if cartModel.isMinimumReached()
        @$el.slideUp()
      else
        @$el.slideDown()

    _navigateToHome: ->
      router.navigate "store", true

    destroy: ->
      @stopListening()

