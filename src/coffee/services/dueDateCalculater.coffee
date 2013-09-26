define ["underscore"], (_) ->

  DueDateCalculater =

    getDueDate: (deliveryTimesCollection, minimumDeliveryTime, dueDate = new Date(), minutesToAdd = 0) ->
      @dueDate = dueDate

      if @_isNow
        @_addMinutes minimumDeliveryTime
      else
        @_addMinutes minutesToAdd

      nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel()
      unless @_isBetween nextDeliveryTimeModel.get "startMinutes", nextDeliveryTimeModel.get "endMinutes"
        nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel(1)
        if nextDayOfWeek = nextDeliveryTimeModel.get "dayOfWeek" isnt @dueDate.getDay()
          # TODO
          1
        @dueDate.setHours = parseInt nextDeliveryTimeModel.get("startMinutes") / 60, 10
        @dueDate.setMinutes = nextDeliveryTimeModel.get "startMinutes" % 60

      @dueDate


    _isNow: ->
      @dueDate.toTimeString() is new Date().toTimeString()

    _addMinutes: (minutes) ->
      @dueDate = new Date(@dueDate.getTime() + minutes * 60000)

    _isBetween: (startMinutes, endMinutes) ->
      startMinutes <= @dueDate.getMinutes() + @dueDate.getHours() * 60 <= endMinutes

