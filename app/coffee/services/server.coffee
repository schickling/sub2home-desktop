define ["jquery"], ($) ->

  Server =

    storeAlias: ""

    initialize: ->
      $.ajaxSetup beforeSend: (xhr, settings) =>
        settings.url = @getComposedUrl settings.url, window.location.host

    getComposedUrl: (path, host) ->
      return path  if path.substring(0, 4) is "http"

      path = path.replace("storeAlias", @storeAlias)
      "https://api.#{host}/#{path}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias
