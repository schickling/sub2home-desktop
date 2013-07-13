// Filename: src/js/views/store/tray/NoDeliveryView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/tray/NoDeliveryTemplate.html'
    ], function ($, _, Backbone, NoDeliveryTemplate) {

	"use strict";

	var NoDeliveryView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html(NoDeliveryTemplate);

		}

	});

	return NoDeliveryView;

});