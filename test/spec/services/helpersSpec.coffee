define ["jquery", "services/helpers"], ($, helpers) ->

  describe "check helpers service", ->

    it "should create an object of an array", ->
      inputArray = ["A", "B"]
      $expectedObject = $()
      $expectedObject = $expectedObject.add("A")
      $expectedObject = $expectedObject.add("B")
      expect($.makeObjectOfArray(inputArray)).toEqual($expectedObject)