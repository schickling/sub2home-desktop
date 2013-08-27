// Filename: src/js/views/store/config/MapView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'gmaps',
    'views/assets/mapStyles'
    ], function ($, _, Backbone, gmaps, mapStyles) {

	"use strict";

	var MapView = Backbone.View.extend({

		map: null,

		marker: null,

		initialize: function () {
			this._loadMap();
		},

		_loadMap: function () {

			var mapOptions = {
				center: new gmaps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
				// Berlin
				zoom: 15,
				keyboardShortcuts: false,
				disableDefaultUI: true,
				draggable: false,
				disableDoubleClickZoom: true,
				scrollwheel: false,
				styles: mapStyles,
				mapTypeId: gmaps.MapTypeId.TERRAIN
			};

			var map = this.map = new gmaps.Map(this.el, mapOptions);

			// initialize geocoder
			this.geocoder = new gmaps.Geocoder();

			// wait unitl map is loaded
			var self = this;
			gmaps.event.addListenerOnce(map, 'idle', function () {
				gmaps.event.trigger(map, 'resize');
				self._addMarker();
				self._listenForCoordinateChanges();
			});

		},

		_addMarker: function () {
			var icon = new gmaps.MarkerImage('https://d3uu6huyzvecb1.cloudfront.net/images/common/pin.png', // url
			null, // size
			null, // origin
			new gmaps.Point(29, 87) // anchor
			);

			var marker = this.marker = new gmaps.Marker({
				position: this.map.getCenter(),
				icon: icon,
				cursor: 'default'
			});

			// To add the marker to the map, call setMap();
			marker.setMap(this.map);
		},

		_listenForCoordinateChanges: function () {
			this.listenTo(this.model, 'change', function () {
				var newCenter = new gmaps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
				this.marker.setPosition(newCenter);
				this.map.setCenter(newCenter);
			});
		},

		destroy: function () {
			this.stopListening();
		}

	});

	return MapView;

});