// Filename: src/js/views/header/ClientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header/ClientTemplate.html'
	], function ($, _, Backbone, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {

			var $el = this.$el;
			
			$el.fadeOut(150, function() {
				$el.html(ClientTemplate);
				$el.fadeIn(150);
			});

		}

	});

	return ClientView;

});