(function() {
  define("gmaps", ["async!https://maps.google.com/maps/api/js?v=3&sensor=false"], function() {
    "use strict";
    return window.google.maps;
  });

}).call(this);
