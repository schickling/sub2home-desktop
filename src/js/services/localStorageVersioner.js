define([], function() {
  var LocalStorageVersioner;
  return LocalStorageVersioner = {
    version: 1,
    initialize: function() {
      var cachedVersion;
      cachedVersion = window.localStorage.getItem("version") || 0;
      if (this.version > cachedVersion) {
        window.localStorage.clear();
        window.localStorage.setItem("version", this.version);
        return console.log("Version " + this.version + " loaded");
      }
    }
  };
});

/*
//@ sourceMappingURL=localStorageVersioner.js.map
*/