define [], () ->

  LocalStorageVersioner =

    version: 1

    initialize: ->
      cachedVersion = window.localStorage.getItem("version") || 0
      if @version > cachedVersion
        window.localStorage.clear()
        window.localStorage.setItem("version", @version)
        console.log "Version #{@version} loaded"