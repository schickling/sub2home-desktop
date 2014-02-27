define ["services/serverTime"], (serverTime) ->

  Date.prototype.addMinutes = (minutes) ->
    this.setTime(new Date(this.getTime() + minutes * 60000))

  Date.prototype.clone = ->
    new Date(this.getTime())

  Date.prototype.getTotalMinutes = ->
    this.getHours() * 60 + this.getMinutes()

  DueDateCalculater =

    getDueDate: (deliveryTimesCollection, minimumDeliveryTime, dueDate = serverTime.getCurrentDate(), minutesToAdd = 0) ->
      @now = serverTime.getCurrentDate()
      @dueDate = if dueDate > @now then dueDate.clone() else @now.clone()
      @dueDate.addMinutes minutesToAdd
      @minimumDeliveryTime = minimumDeliveryTime
      @nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel @now

      return null  if @_endMinutesExceeded()

      if minutesToAdd < 0
        return null  unless @_startMinutesReached() and @_minimumReached()
      else
        @_jumpToBorder()  unless @_startMinutesReached()
        @_increase()  unless @_minimumReached()

      @_roundUp()

      @dueDate

    _startMinutesReached: ->
      @dueDate.getTotalMinutes() >= @nextDeliveryTimeModel.get("startMinutes")

    _endMinutesExceeded: ->
      @dueDate.getTotalMinutes() > @nextDeliveryTimeModel.get("endMinutes") + @minimumDeliveryTime

    _minimumReached: ->
      @dueDate.getTotalMinutes() >= @now.getTotalMinutes() + @minimumDeliveryTime

    _jumpToBorder: ->
      @dueDate.setHours parseInt(@nextDeliveryTimeModel.get("startMinutes") / 60, 10)
      @dueDate.setMinutes @nextDeliveryTimeModel.get("startMinutes") % 60

    _increase: ->
      minimumToAdd = @minimumDeliveryTime - @dueDate.getTotalMinutes() + @now.getTotalMinutes()
      @dueDate.addMinutes minimumToAdd

    _roundUp: ->
      # round up to 5
      @dueDate.addMinutes ((5 - (@dueDate.getMinutes() % 5)) % 5)

