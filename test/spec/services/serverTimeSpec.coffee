define ["services/serverTime"], (serverTime) ->

  describe "due serverTime service", ->

    it "should return the current date by default", ->
      now = new Date()
      resultDate = serverTime.getCurrentDate()
      expect(resultDate.getTime()).toBe(now.getTime())

    it "should return an increased date", ->
      now = new Date()
      difference = 2 * 60 * 60 * 1000
      serverTimestamp = parseInt((now.getTime() + difference), 10)
      serverTime.setServerTime(serverTimestamp)
      resultDate = serverTime.getCurrentDate()
      expect(resultDate.getTime()).toBe(serverTimestamp)

    it "should return a decreased date", ->
      now = new Date()
      difference = 2 * 60 * 60 * 1000
      serverTimestamp = parseInt((now.getTime() - difference), 10)
      serverTime.setServerTime(serverTimestamp)
      resultDate = serverTime.getCurrentDate()
      expect(resultDate.getTime()).toBe(serverTimestamp)