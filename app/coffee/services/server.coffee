define ["jquery", "services/serverTime"], ($, ServerTime) ->

  Server =

    storeAlias: ""

    initialize: ->
      $.ajaxSetup
        beforeSend: (xhr, settings) =>
          settings.url = @getComposedUrl settings.url, window.location.hostname
        complete: (xhr, status) =>
          headerServerTime = xhr.getResponseHeader("server-time")

          if headerServerTime
            serverDate = new Date(headerServerTime)
            serverTimestamp = serverDate.getTime()
            ServerTime.setServerTime(serverTimestamp)
            headerTimeLength = headerServerTime.length
            serverGMT = headerServerTime.substr(headerTimeLength-5 , headerTimeLength).split(':')[0]
            ServerTime.setServerGMT(parseInt(serverGMT))


    getComposedUrl: (path, hostname) ->
      return path  if path.substring(0, 4) is "http"

      path = path.replace("storeAlias", @storeAlias)
      if hostname.indexOf("sub2home.com") isnt -1
        "https://api.sub2home.com/#{path}"
      else
        "https://#{hostname}:1070/#{path}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias
