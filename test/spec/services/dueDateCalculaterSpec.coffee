define ["services/dueDateCalculater", "collections/DeliveryTimesCollection"], (dueDateCalculater, DeliveryTimesCollection) ->

  describe "check due date matcher service", ->

    it "should return now for 0 minimumDeliveryTime if is currently delivering", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      minimumDeliveryTime = 0
      dueDate = new Date()
      dueTime = dueDate.toTimeString()
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, minimumDeliveryTime).toTimeString()).toBe(dueTime)
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, minimumDeliveryTime, dueDate).toTimeString()).toBe(dueTime)

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      minimumDeliveryTime = 20
      now = new Date()
      now.setMinutes(now.getMinutes() + 20)
      dueTime = now.toTimeString()
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, minimumDeliveryTime).toTimeString()).toBe(dueTime)

  getDeliveringDeliveryTimesCollection = ->
    new DeliveryTimesCollection()