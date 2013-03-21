// Filename: src/js/views/store/tray/FreeCookieView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/FreeCookieTemplate.html'
    ], function ($, _, Backbone, notificationcenter, cartModel, FreeCookieTemplate) {

	var FreeCookieView = Backbone.View.extend({

		template: _.template(FreeCookieTemplate),

		events: {
			'focusin #gratisCookieOptionInput': '_extendInput'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {};

			this.$el.html(this.template(json));

		},

		_extendInput: function () {
			this.$('#gratisCookieOptionInput').animate({
				width: 300
			});
		}

	});

	return FreeCookieView;

});