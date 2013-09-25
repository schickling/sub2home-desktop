require ["config"], ->
  # wait for config loaded and start app
  require ["services/router"], (router) ->
    router.init()