(function() {
  define(["jquery"], function($) {
    "use strict";
    var Server;
    Server = {
      storeAlias: "",
      initialize: function() {
        var self;
        self = this;
        return $.ajaxSetup({
          beforeSend: function(xhr, settings) {
            return settings.url = self.getComposedUrl(settings.url);
          }
        });
      },
      getComposedUrl: function(url) {
        if (url.substring(0, 3) === "http") {
          return url;
        }
        url = url.replace("storeAlias", this.storeAlias);
        return "/api/frontend/" + url;
      },
      setStoreAlias: function(storeAlias) {
        return this.storeAlias = storeAlias;
      }
    };
    Server.initialize();
    return Server;
  });

}).call(this);
