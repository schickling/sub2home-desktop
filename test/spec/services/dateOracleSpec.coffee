define ["services/dateOracle"], (dateOracle) ->

  describe "due dateOracle service", ->

    it "should return the current date by default", ->
      now = new Date()
      resultDate = dateOracle.getCurrentDate()
      expect(resultDate.getTime()).toBe(now.getTime())

    it "should return an increased date", ->
      now = new Date()
      difference = 2 * 60 * 60 * 1000
      serverTimestamp = parseInt((now.getTime() + difference) / 1000, 10)
      dateOracle.setServerTime(serverTimestamp)
      resultDate = dateOracle.getCurrentDate()
      expect(resultDate.getTime()).toBe(now.getTime() + difference)

    it "should return a decreased date", ->
      now = new Date()
      difference = 2 * 60 * 60 * 1000
      serverTimestamp = parseInt((now.getTime() - difference) / 1000, 10)
      dateOracle.setServerTime(serverTimestamp)
      resultDate = dateOracle.getCurrentDate()
      expect(resultDate.getTime()).toBe(now.getTime() - difference)