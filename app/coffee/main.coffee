require ["config"], ->
    # wait for config loaded and start app
    require ["bowser", "services/router"], (bowser, router) ->
      if bowser.mobile or bowser.tablet
        window.location.href = "http://m.sub2home.com"
        return
      else if bowser.msie and bowser.version < 9
        window.location.href = "http://browser.sub2home.com"
        return
      router.init()
