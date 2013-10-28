define(["jquery"], function($) {
  var Server;
  return Server = {
    storeAlias: "",
    api: "/api/frontend",
    initialize: function() {
      var _this = this;
      return $.ajaxSetup({
        beforeSend: function(xhr, settings) {
          return settings.url = _this.getComposedUrl(settings.url);
        }
      });
    },
    getComposedUrl: function(url) {
      if (url.substring(0, 4) === "http") {
        return url;
      }
      url = url.replace("storeAlias", this.storeAlias);
      return "" + this.api + "/" + url;
    },
    setStoreAlias: function(storeAlias) {
      return this.storeAlias = storeAlias;
    }
  };
});

/*
//@ sourceMappingURL=server.js.map
*/