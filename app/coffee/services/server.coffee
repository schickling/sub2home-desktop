define ["jquery"], ($) ->

  Server =

    storeAlias: ""

    initialize: ->
      $.ajaxSetup beforeSend: (xhr, settings) =>
        settings.url = @getComposedUrl settings.url, window.location.hostname

    getComposedUrl: (path, hostname) ->
      return path  if path.substring(0, 4) is "http"

      path = path.replace("storeAlias", @storeAlias)
      if hostname is "sub2home.com"
        "https://api.#{hostname}/#{path}"
      else
        "https://#{hostname}:1070/#{path}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias
