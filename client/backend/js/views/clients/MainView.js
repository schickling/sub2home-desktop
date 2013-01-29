// Filename: js/views/clients/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/clients/ClientsView',
	'text!templates/clients/MainTemplate.html'
	], function ($, _, Backbone, PageView, ClientsView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Dashboard',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			var clientsView = new ClientsView({
				el: this.$('#content')
			});
		}

	});

	return MainView;

});