require(["config"], function() {
  return require(["services/router"], function(router) {
    return router.init();
  });
});
