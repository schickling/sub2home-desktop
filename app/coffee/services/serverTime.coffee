define [], ->

  ServerTime =

    difference: 0

    getCurrentDate: ->
      now = new Date()
      new Date(now.getTime() + @difference)

    setServerTime: (jsTimestamp) ->
      now = new Date()
      @difference = jsTimestamp - now.getTime()