require ["config"], ->
  require ["bowser"], (bowser) ->

    if bowser.mobile or bowser.tablet or (bowser.msie and bowser.version < 9)
      window.location.href = "http://m.sub2home.com"
      return

    # wait for config loaded and start app
    require ["services/router"], (router) ->
      router.init()
