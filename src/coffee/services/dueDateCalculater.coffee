define [], ->

  Date.prototype.addMinutes = (minutes) ->
    this.setTime new Date this.getTime() + minutes * 60000

  Date.prototype.clone = ->
    new Date this.getTime()

  Date.prototype.getTotalMinutes = ->
    this.getHours() * 60 + this.getMinutes()

  DueDateCalculater =

    getDueDate: (deliveryTimesCollection, minimumDeliveryTime, dueDate = new Date(), minutesToAdd = 0) ->
      dueDate = dueDate.clone()
      dueDate.addMinutes minutesToAdd

      nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel(dueDate)

      difference = Math.max nextDeliveryTimeModel.get("startMinutes") - dueDate.getTotalMinutes(), minimumDeliveryTime
      dueDate.addMinutes difference

      dueDate