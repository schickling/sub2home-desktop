define [], ->

  ServerTime =

    difference: 0

    getCurrentDate: ->
      now = new Date()
      new Date(now.getTime() + @difference)

    setServerTime: (jsTimestamp, serverGMT) ->
      now = new Date()
      localGMT = now.getHours() - now.getUTCHours()
      @difference = (jsTimestamp - now.getTime())

    setServerGMT: (serverGMT) ->
      now = new Date()
      localGMT = now.getHours() - now.getUTCHours()
      @difference +=  ((serverGMT - localGMT) *  60 * 60 * 1000)