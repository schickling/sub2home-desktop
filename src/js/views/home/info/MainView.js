// Filename: src/js/views/home/info/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/PageView',
    'views/shared/info/HomeView',
    'views/shared/info/NavigationView',
    'text!templates/home/info/MainTemplate.html'
    ], function ($, _, Backbone, PageView, HomeView, NavigationView, MainTemplate) {

	var MainView = PageView.extend({

		template: _.template(MainTemplate),

		pageTitle: 'Infotheke - sub2home',

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html(MainTemplate);

			this._renderHome();

			this._renderNavigation();

			this.append();

		},

		_renderHome: function () {
			new HomeView({
				el: this.$('#homeInfo')
			});
		},

		_renderNavigation: function () {
			new NavigationView({
				el: this.$el
			});
		}

	});

	return MainView;

});