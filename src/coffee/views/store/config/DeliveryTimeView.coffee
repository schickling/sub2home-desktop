define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/config/DeliveryTimeTemplate.html"
], ($, _, Backbone, notificationcenter, DeliveryTimeTemplate) ->

  DeliveryTimeView = Backbone.View.extend

    className: "deliveryTime"

    template: _.template(DeliveryTimeTemplate)

    events:
      "focusout .deliveryTimeStartMinutes": "_updateStartMinutes"
      "focusout .deliveryTimeEndMinutes": "_updateEndMinutes"
      "keypress input": "_blurOnEnter"
      "click .bRemove": "_destroy"

    initialize: ->
      @_render()

    _render: ->
      json =
        startTime: @model.getStartTime()
        endTime: @model.getEndTime()

      @$el.html @template(json)

    _destroy: ->
      self = this
      @$el.fadeOut ->
        self.model.destroy()
        self.remove()


    _updateStartMinutes: (e) ->
      $input = @$(".deliveryTimeStartMinutes")
      time = $input.val()
      if @_checkTimeFormat(time)
        @_updateModel startMinutes: @_parseTime(time)
      else
        @_render()

    _updateEndMinutes: (e) ->
      $input = @$(".deliveryTimeEndMinutes")
      time = $input.val()
      if @_checkTimeFormat(time)
        @_updateModel endMinutes: @_parseTime(time)
      else
        @_render()

    _updateModel: (changedAttributes) ->
      self = this
      @model.save changedAttributes,
        validate: true
        success: ->
          notificationcenter.notify "views.store.config.deliveryTime.change.success"

        error: ->
          notificationcenter.notify "views.store.config.deliveryTime.change.error"
          
          # rerender
          self._render()


    _checkTimeFormat: (time) ->
      if time.match(/^((([01]?[0-9]|2[0-3]):[0-5][0-9])|24:00)$/)
        true
      else
        notificationcenter.notify "views.store.config.deliveryTime.wrongTimeFormat"
        false

    _parseTime: (time) ->
      parts = time.split(":")
      parts[0] * 60 + parts[1] * 1

    _blurOnEnter: (e) ->
      return  unless e.keyCode is 13
      $input = $(e.target)
      $input.blur()

