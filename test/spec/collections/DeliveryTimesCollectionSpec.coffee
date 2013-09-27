define ["collections/DeliveryTimesCollection"], (DeliveryTimesCollection) ->

  describe "check getNextDeliveryTimeModel for delivery times collection", ->

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

    beforeEach ->
      deliveryTimesCollection.shuffle()

    it "should return current", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 11:00:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 660
        endMinutes: 840
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 12:25:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 660
        endMinutes: 840
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 14:00:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 660
        endMinutes: 840
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 14:00:59 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 660
        endMinutes: 840
        )

    it "should return this evening", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 14:01:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 1080
        endMinutes: 1320
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 18:00:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 1080
        endMinutes: 1320
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 22:00:59 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 4
        startMinutes: 1080
        endMinutes: 1320
        )

    it "should return tomorrow noon", ->
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Thu Aug 16 2012 22:01:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 5
        startMinutes: 660
        endMinutes: 840
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Fri Aug 17 2012 00:00:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 5
        startMinutes: 660
        endMinutes: 840
        )
      expect(deliveryTimesCollection.getNextDeliveryTimeModel(new Date("Fri Aug 17 2012 14:00:00 GMT+0200")).toJSON()).toEqual(
        dayOfWeek: 5
        startMinutes: 660
        endMinutes: 840
        )
