// Filename: src/js/views/client/dashboard/RevenuessView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/client/dashboard/RevenuesView',
    'text!templates/client/dashboard/RevenuesTemplate.html'
	], function ($, _, Backbone, RevenuesView, RevenuesTemplate) {

	var RevenuessView = Backbone.View.extend({

		template: _.template(RevenuesTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {

			};

			this.$el.html(this.template(json));

			this._renderRevenues();
		},

		_renderRevenues: function () {
			
		}


	});

	return RevenuessView;

});