(function() {
  require(["config"], function() {
    return require(["router"], function(router) {
      return router.init();
    });
  });

}).call(this);
