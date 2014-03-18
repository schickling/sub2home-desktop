define ["jquery"], ($) ->

  Server =

    storeAlias: ""
    api: "/api"

    initialize: ->
      $.ajaxSetup beforeSend: (xhr, settings) =>
        settings.url = @getComposedUrl settings.url

    getComposedUrl: (url) ->
      return url  if url.substring(0, 4) is "http"
      url = url.replace("storeAlias", @storeAlias)
      "#{@api}/#{url}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias
