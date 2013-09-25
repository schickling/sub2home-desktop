define(["services/gmaps"], function(gmaps) {
  var PostalOracle, geocoder;
  geocoder = new gmaps.Geocoder();
  return PostalOracle = {
    shouldBeCanceled: false,
    calculate: function(successCallback, errorCallback) {
      var self;
      self = this;
      if (!navigator.geolocation) {
        errorCallback();
        return;
      }
      this.shouldBeCanceled = false;
      return navigator.geolocation.getCurrentPosition((function(position) {
        var latLng;
        if (self.shouldBeCanceled) {
          return;
        }
        latLng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);
        return geocoder.geocode({
          latLng: latLng
        }, function(results, status) {
          var addressComponent, postal, type, _i, _j, _len, _len1, _ref, _ref1;
          if (self.shouldBeCanceled) {
            return;
          }
          if (status === gmaps.GeocoderStatus.OK) {
            _ref = results[0].address_components;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              addressComponent = _ref[_i];
              _ref1 = addressComponent.types;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                type = _ref1[_j];
                if (type === "postal_code") {
                  postal = addressComponent.long_name;
                  break;
                }
              }
            }
            if (postal < 10000 || postal > 99999) {
              return errorCallback();
            } else {
              self.setPostal(postal);
              return successCallback();
            }
          } else {
            return errorCallback();
          }
        });
      }), errorCallback, {
        timeout: 10000
      });
    },
    cancel: function() {
      return this.shouldBeCanceled = true;
    },
    setPostal: function(postal) {
      return localStorage.setItem("postal", postal);
    },
    getPostal: function() {
      return localStorage.getItem("postal");
    }
  };
});
