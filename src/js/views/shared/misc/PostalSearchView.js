// Filename: src/js/views/shared/misc/PostalSearchView.js
define([
    'jquery',
    'jqueryRotate',
    'underscore',
    'backbone',
    'notificationcenter',
    'modules/postalOracle',
    'text!templates/shared/misc/PostalSearchTemplate.html'
], function ($, jqueryRotate, _, Backbone, notificationcenter, postalOracle, PostalSearchTemplate) {

	"use strict";

	var PostalSearchView = Backbone.View.extend({

		template: _.template(PostalSearchTemplate),

		events: {
			'input #locationSelectionInput': '_checkInput'
		},

		$input: null,
		$location: null,
		$locationLoader: null,
		$locationLabel: null,
		$deliveryAreaLabel: null,
		$storeSelectionLabel: null,

		postal: null,

		rotateInterval: null,

		initialize: function () {
			this._render();
			this._cacheDom();
			this._checkLocation();
		},

		_render: function () {
			this.$el.html(this.template());
		},

		_cacheDom: function () {
			this.$input = this.$('#locationSelectionInput');
			this.$deliveryAreaLabel = this.$('#deliveryAreaLabel');
			this.$storeSelectionLabel = this.$('#storeSelectionLabel');
			this.$location = this.$('#location');
			this.$locationLoader = this.$('#locationLoader');
			this.$locationLabel = this.$('#locationLabel');
		},

		_checkLocation: function () {
			var self = this;

			this._startRotateLocation();

			postalOracle.calculate(function (postal) {
				self._stopAndHideRotateLocation();
				self._focusSearch();
				self.setPostal(postal);
			}, function () {
				self._stopAndHideRotateLocation();
				self._focusSearch();
			});

		},

		setPostal: function (postal) {
			postal = parseInt(postal, 10);

			if (postal != this.postal) {
				this.trigger('newPostal', postal);
			}

			this.$input.val(postal);
			this.postal = postal;
		},

		_focusSearch: function () {
			this.$input.focus();
		},

		_unfocusSearch: function () {
			this.$input.blur();
		},

		_checkInput: function (e) {
			this._stopLocationDetermination();

			var postal = e.target.value.replace(/[^0-9]/, '');

			this.$input.val(postal);

			if (postal.length < 5) return;

			if (this._isValidPostal(postal)) {
				this.setPostal(postal);
			} else {
				this.$input.val(this.postal);
			}
		},

		_isValidPostal: function (postal) {
			return postal > 9999 && postal < 100000;
		},

		_stopLocationDetermination: function () {
			this._stopAndHideRotateLocation();
			postalOracle.cancel();
		},

		_startRotateLocation: function () {
			var $location = this.$location,
				deg = 0;

			this.rotateInterval = setInterval(function () {
				deg = (deg + 5) % 180;
				$location.rotate(deg);
			}, 20);
		},

		_stopAndHideRotateLocation: function () {
			clearInterval(this.rotateInterval);

			this.$locationLoader.stop().fadeOut(100);
			this.$locationLabel.stop().animate({
				marginLeft: -174
			}, 200);
		},

		showDeliveryAreaLabel: function () {
			this.$locationLabel.fadeOut(100);
			this.$storeSelectionLabel.stop().fadeOut(100);
			this.$deliveryAreaLabel.stop().delay(100).fadeIn(150);
		},

		showStoreSelectionLabel: function () {
			this.$deliveryAreaLabel.stop().fadeOut(100);
			this.$locationLabel.fadeOut(100);
			this.$storeSelectionLabel.stop().delay(100).fadeIn(150);
		},

		destroy: function() {
			this._stopLocationDetermination();
		}

	});

	return PostalSearchView;

});