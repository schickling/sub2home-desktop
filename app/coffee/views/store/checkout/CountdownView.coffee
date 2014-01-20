define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "models/stateModel"
  "models/cartModel"
  "text!templates/store/checkout/CountdownTemplate.html"
], ($, _, Backbone, moment, stateModel, cartModel, CountdownTemplate) ->

  CountdownView = Backbone.View.extend

    template: _.template(CountdownTemplate)
    countdownTimer: null

    initialize: ->
      @_render()
      # keep due date in time
      @_initializeCountdownTimer()

    _initializeCountdownTimer: ->
      self = this
      @countdownTimer = setInterval(->
        self._render()
      , 60000)

    _render: ->
      orderModel = cartModel.get("orderModel")
      dueDate = orderModel.get("dueDate")
      dueMoment = moment(dueDate)
      currentMoment = moment()
      hours = dueMoment.diff(currentMoment, "hours")
      minutes = dueMoment.diff(currentMoment, "minutes") % 60
      storeModel = stateModel.get("storeModel")
      storeAddressModel = storeModel.get("addressModel")
      customerAddressModel = cartModel.getCustomerAddressModel()
      json =
        dueTime: dueMoment.format("HH:mm")
        hours: @_padNumber(hours)
        minutes: @_padNumber(minutes)
        firstName: customerAddressModel.get("firstName")
        street: customerAddressModel.get("street")
        storePhone: storeAddressModel.get("phone")
        storeEmail: storeModel.get("orderEmail")

      @$el.html @template(json)

    _padNumber: (number) ->
      number = "0" + number  if number < 10
      number

    destroy: ->
      clearInterval @countdownTimer

