define ["services/dueDateCalculater", "collections/DeliveryTimesCollection"], (dueDateCalculater, DeliveryTimesCollection) ->

  describe "check due date matcher service", ->

    # its now always August 16, 2012 12:25:00
    WindowDate = window.Date
    window.Date = -> new WindowDate("August 16, 2012 12:25:00")

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