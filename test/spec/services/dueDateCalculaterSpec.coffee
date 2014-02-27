define [
  "services/dueDateCalculater"
  "services/serverTime"
  "collections/DeliveryTimesCollection"
], (dueDateCalculater, serverTime, DeliveryTimesCollection) ->

  describe "due date matcher service", ->

    afterEach ->

    it "should return now for 0 minimumDeliveryTime if is currently delivering", ->
      serverTime.setServerTime 1345112700 # Thu Aug 16 2012 12:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      dueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0, dueDate).toStr()).toBe(dueDate.toStr())

    it "should default to now", ->
      serverTime.setServerTime 1345112700 # Thu Aug 16 2012 12:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      dueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0).toStr()).toBe(dueDate.toStr())

    it "should keep saved dueDate and increase", ->
      serverTime.setServerTime 1345109100 # Thu Aug 16 2012 11:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:35:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0, inputDueDate, 10).toStr()).toBe(expectedDueDate.toStr())

    it "should keep saved dueDate, increase and round", ->
      serverTime.setServerTime 1345109100 # Thu Aug 16 2012 11:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:40:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0, inputDueDate, 11).toStr()).toBe(expectedDueDate.toStr())

    it "should keep saved dueDate, increase and still take this delivery time", ->
      serverTime.setServerTime 1345109100 # Thu Aug 16 2012 11:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 14:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 0, inputDueDate, 95).toStr()).toBe(expectedDueDate.toStr())

    it "should keep saved dueDate even with 20 minimumDeliveryTime", ->
      serverTime.setServerTime 1345111500 # Thu Aug 16 2012 12:05:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should keep saved dueDate, increase and still take this delivery time, even with 20 minimumDeliveryTime", ->
      serverTime.setServerTime 1345109100 # Thu Aug 16 2012 11:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 14:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, 95).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering", ->
      serverTime.setServerTime 1345112700 # Thu Aug 16 2012 12:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:25:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:45:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should round to fives", ->
      serverTime.setServerTime 1345112760 # Thu Aug 16 2012 12:26:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:26:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:50:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should get next for saved dueDate", ->
      serverTime.setServerTime 1345118460 # Thu Aug 16 2012 14:01:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:26:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering and last minute is running", ->
      serverTime.setServerTime 1345118459 # Thu Aug 16 2012 14:00:59 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 14:00:59 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 14:20:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if is currently delivering and last minute is running, even with wrong saved dueDate", ->
      serverTime.setServerTime 1345118459 # Thu Aug 16 2012 14:00:59 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 14:10:59 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 14:20:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if last delivery time just ran out", ->
      serverTime.setServerTime 1345118460 # Thu Aug 16 2012 14:01:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 14:01:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if next will beginn in 20", ->
      serverTime.setServerTime 1345131600 # Thu Aug 16 2012 17:40:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 17:40:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return next possible dueDate for 20 minimumDeliveryTime if next will beginn in 19", ->
      serverTime.setServerTime 1345131660 # Thu Aug 16 2012 17:41:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 17:41:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 18:05:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate).toStr()).toBe(expectedDueDate.toStr())

    it "should return null dueDate before now + minimumDeliveryTime for -1", ->
      serverTime.setServerTime 1345112400 # Thu Aug 16 2012 12:20:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:40:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, -1)).toBe(null)

    it "should return null dueDate before now + minimumDeliveryTime for also -1", ->
      serverTime.setServerTime 1345106400 # Thu Aug 16 2012 10:40:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 11:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, -1)).toBe(null)

    it "should return null dueDate before now + minimumDeliveryTime for -60", ->
      serverTime.setServerTime 1345104000 # Thu Aug 16 2012 10:00:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 11:59:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, -60)).toBe(null)

    it "should decrease by 5", ->
      serverTime.setServerTime 1345112700 # Thu Aug 16 2012 12:25:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:50:00 GMT+0200")
      expectedDueDate = new Date("Thu Aug 16 2012 12:45:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, -5).toStr()).toBe(expectedDueDate.toStr())

    it "shouldn't skip to next", ->
      serverTime.setServerTime 1345111200 # Thu Aug 16 2012 12:20:00 GMT+0200
      deliveryTimesCollection = getDeliveringDeliveryTimesCollection()
      inputDueDate = new Date("Thu Aug 16 2012 12:00:00 GMT+0200")
      expect(dueDateCalculater.getDueDate(deliveryTimesCollection, 20, inputDueDate, 221)).toBe(null)

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
