define ["services/dueDateCalculater", "collections/DeliveryTimesCollection", "timemachine"], (dueDateCalculater, DeliveryTimesCollection, timemachine) ->

  describe "check due date matcher service", ->

    it "should return now for 0 minimumDeliveryTime if is currently delivering", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      dueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0, dueDate).toStr()).toBe(dueDate.toStr())

    it "should default to now", ->
      timemachine.config dateString: "Thu Aug 16 2012 12:25:00 GMT+0200"
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      dueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0).toStr()).toBe(dueDate.toStr())
      timemachine.reset()

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:45:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())
      timemachine.reset()

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering and last minute is running", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 14:00:59 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 14:20:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if last delivery time just ran out", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 14:01:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if next will beginn in 20", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 17:40:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if next will beginn in 19", ->
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 17:41:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:01:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

  getDeliveringDeliveryTimesCollection = ->
    deliveryTimesCollection = new DeliveryTimesCollection()
    for dayOfWeek in [0..6]
      deliveryTimesCollection.add
        dayOfWeek: dayOfWeek
        startMinutes: 660 # 11am
        endMinutes: 840 # 2pm
      deliveryTimesCollection.add
        dayOfWeek: dayOfWeek
        startMinutes: 1080 # 6pm
        endMinutes: 1320 # 10pm
    deliveryTimesCollection

  Date.prototype.toStr = ->
    "#{this.toDateString()} #{this.getHours()}:#{this.getMinutes()}"
