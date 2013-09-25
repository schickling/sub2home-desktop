define ["jquery"], ($) ->

  Server =
    storeAlias: ""

    initialize: ->
      self = this
      $.ajaxSetup beforeSend: (xhr, settings) ->
        settings.url = self.getComposedUrl(settings.url)

    getComposedUrl: (url) ->
      return url if url.substring(0, 3) is "http"
      url = url.replace("storeAlias", @storeAlias)
      "/api/frontend/#{url}"

    setStoreAlias: (storeAlias) ->
      @storeAlias = storeAlias

  Server.initialize()
  Server
