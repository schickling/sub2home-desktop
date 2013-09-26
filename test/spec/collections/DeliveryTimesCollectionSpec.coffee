define ["collections/DeliveryTimesCollection"], (DeliveryTimesCollection) ->

  describe "check delivery times collection", ->

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

    # its now always August 16, 2012 12:25:00
    WindowDate = window.Date
    window.Date = -> new WindowDate("August 16, 2012 12:25:00")

    beforeEach ->
      deliveryTimesCollection.shuffle()

    it "should get next", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel().toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 660
        endMinutes: 840
        )

    it "should skip one", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(1).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 1080
        endMinutes: 1320
        )

    it "should skip two", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(2).toJSON()).toEqual(
        dayOfWeek: 5
        startMinutes: 660
        endMinutes: 840
        )

    it "should skip eight", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(8).toJSON()).toEqual(
        dayOfWeek: 1
        startMinutes: 660
        endMinutes: 840
        )

    it "should skip fourteen and fail", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(14)).toBe(undefined)
