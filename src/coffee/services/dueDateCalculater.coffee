define ["underscore"], (_) ->

  DueDateCalculater =

    getDueDate: (deliveryTimesCollection, minimumDeliveryTime, dueDate = new Date(), minutesToAdd = 0) ->

      dueDate
