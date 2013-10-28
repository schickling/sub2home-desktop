define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/notifications/NotificationTemplate.html"
], ($, _, Backbone, NotificationTemplate) ->

  NotificationView = Backbone.View.extend

    className: "notification"
    template: _.template(NotificationTemplate)
    timer: 0
    zIndex: 0

    events:
      "click .bClose": "_close"
      close: "_close" # custom dom event needed to clear all notifications
      mouseenter: "_stopTimer"
      mouseleave: "_countdown"

    initialize: ->
      @zIndex = @options.zIndex
      @_render()
      @_countdown()

    _render: ->
      @$el.html @template(@model.toJSON())
      @$el.addClass @model.get("className")
      @$el.css zIndex: @zIndex

    _countdown: ->
      if @model.get("duration") > 0
        self = this
        @timer = setTimeout(->
          self._destroy()
        , @model.get("duration"))

    _stopTimer: ->
      clearTimeout @timer

    _close: ->
      @_stopTimer()
      @_destroy()

    _destroy: ->
      $el = @$el
      $el.animate
        marginTop: -($el.outerHeight(true))
        opacity: 0
      , 400, ->
        $el.remove()

    slideIn: ->
      $el = @$el
      $el.css(marginTop: -($el.outerHeight(true))).animate
        marginTop: 0
        opacity: 1
      , 300


