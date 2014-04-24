define ["jquery"], ($) ->

  Server =

    storeAlias: ""
    port: 1070

    initialize: ->
      $.ajaxSetup beforeSend: (xhr, settings) =>
        settings.url = @getComposedUrl settings.url, window.location.hostname

    getComposedUrl: (path, hostname) ->
      return path  if path.substring(0, 4) is "http"

      path = path.replace("storeAlias", @storeAlias)
      "https://#{hostname}:#{@port}/#{path}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias
