require ["config"], ->
  # wait for config loaded and start app
  require ["router"], (router) ->
    router.init()