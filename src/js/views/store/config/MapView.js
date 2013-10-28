define(["jquery", "underscore", "backbone", "services/gmaps", "views/assets/mapStyles"], function($, _, Backbone, gmaps, mapStyles) {
  var MapView;
  return MapView = Backbone.View.extend({
    map: null,
    marker: null,
    initialize: function() {
      return this._loadMap();
    },
    _loadMap: function() {
      var map, mapOptions, self;
      mapOptions = {
        center: new gmaps.LatLng(this.model.get("latitude"), this.model.get("longitude")),
        zoom: 15,
        keyboardShortcuts: false,
        disableDefaultUI: true,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        styles: mapStyles,
        mapTypeId: gmaps.MapTypeId.TERRAIN
      };
      map = this.map = new gmaps.Map(this.el, mapOptions);
      this.geocoder = new gmaps.Geocoder();
      self = this;
      return gmaps.event.addListenerOnce(map, "idle", function() {
        gmaps.event.trigger(map, "resize");
        self._addMarker();
        return self._listenForCoordinateChanges();
      });
    },
    _addMarker: function() {
      var icon, marker;
      icon = new gmaps.MarkerImage("https://d3uu6huyzvecb1.cloudfront.net/images/common/pin.png", null, null, new gmaps.Point(29, 87));
      marker = this.marker = new gmaps.Marker({
        position: this.map.getCenter(),
        icon: icon,
        cursor: "default"
      });
      return marker.setMap(this.map);
    },
    _listenForCoordinateChanges: function() {
      return this.listenTo(this.model, "change", function() {
        var newCenter;
        newCenter = new gmaps.LatLng(this.model.get("latitude"), this.model.get("longitude"));
        this.marker.setPosition(newCenter);
        return this.map.setCenter(newCenter);
      });
    },
    destroy: function() {
      return this.stopListening();
    }
  });
});

/*
//@ sourceMappingURL=MapView.js.map
*/