define ["jquery", "underscore", "backbone", "moment", "services/notificationcenter", "services/dueDateCalculater", "models/cartModel", "models/stateModel", "text!templates/store/tray/DeliveryTimeTemplate.html"], ($, _, Backbone, moment, notificationcenter, dueDateCalculater, cartModel, stateModel, DeliveryTimeTemplate) ->

  DeliveryTimeView = Backbone.View.extend

    template: _.template(DeliveryTimeTemplate)

    events:
      "click #hours .iArrowUp.active, #hours .topTile": "_addHour"
      "click #hours .iArrowDown.active, #hours .bottomTile": "_substractHour"
      "click #minutes .iArrowUp.active, #minutes .topTile": "_addFiveMinutes"
      "click #minutes .iArrowDown.active, #minutes .bottomTile": "_substractFiveMinutes"

    intervalTimer: null

    initialize: ->
      @_fixDueDate()
      @_render()
      @_initializeIntervalTimer() # keep due date in time

    _fixDueDate: ->
      orderModel = cartModel.get "orderModel"
      orderModel.set "dueDate", @_getValidDueDate()

    _render: ->
      dueMoment = moment @_getValidDueDate()
      json =
        hoursAreMinimum: not @_isValidDueDateChange(-60)
        minutesAreMinimum: not @_isValidDueDateChange(-5)
        hoursAreMaximum: not @_isValidDueDateChange(60)
        minutesAreMaximum: not @_isValidDueDateChange(5)
        dueHours: dueMoment.format("HH")
        dueMinutes: dueMoment.format("mm")
        minimumDuration: cartModel.getMinimumDuration()
      @$el.html @template(json)

    _initializeIntervalTimer: ->
      @intervalTimer = setInterval =>
        @_fixDueDate
        @_render
      , 60000

    _addHour: ->
      @_addMinutesToDueDate 60

    _substractHour: ->
      @_addMinutesToDueDate -60

    _addFiveMinutes: ->
      @_addMinutesToDueDate 5

    _substractFiveMinutes: ->
      @_addMinutesToDueDate -5

    _isValidDueDateChange: (minutesToAdd) ->
      @_getValidDueDate(minutesToAdd) isnt null

    _addMinutesToDueDate: (minutesToAdd) ->
      dueDate = @_getValidDueDate minutesToAdd
      if dueDate isnt null
        orderModel = cartModel.get "orderModel"
        orderModel.set "dueDate", dueDate
        @_render()

    _getValidDueDate: (minutesToAdd = 0) ->
      storeModel = stateModel.get "storeModel"
      deliveryTimesCollection = storeModel.get "deliveryTimesCollection"
      minimumDuration = storeModel.getMinimumDuration()
      orderModel = cartModel.get "orderModel"
      dueDate = orderModel.get "dueDate"

      dueDateCalculater.getDueDate deliveryTimesCollection, minimumDuration, dueDate, minutesToAdd

    destroy: ->
      clearInterval @intervalTimer

