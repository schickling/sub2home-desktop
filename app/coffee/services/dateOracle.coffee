define [], ->

  DateOracle =

    difference: 0

    getCurrentDate: ->
      now = new Date()
      new Date(now.getTime() + @difference)

    setServerTime: (timestamp) ->
      now = new Date()
      @difference = timestamp * 1000 - now.getTime()