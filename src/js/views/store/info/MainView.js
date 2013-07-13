// Filename: src/js/views/store/info/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'views/PageView',
    'views/shared/info/HomeView',
    'views/store/info/StoreView',
    'views/shared/info/NavigationView',
    'text!templates/store/info/MainTemplate.html'
    ], function ($, _, Backbone, stateModel, PageView, HomeView, StoreView, NavigationView, MainTemplate) {

	"use strict";

	var MainView = PageView.extend({

		template: _.template(MainTemplate),

		initialize: function () {

			// set page title
			this.model = stateModel.get('storeModel');
			this.pageTitle = 'Infotheke ' + this.model.get('title') + ' - sub2home';

			this._render();
		},

		_render: function () {

			this.$el.html(MainTemplate);

			this._renderStore();
			this._renderHome();

			this._renderNavigation();

			this.append();

		},

		_renderStore: function () {
			new StoreView({
				el: this.$('#storeInfo'),
				model: this.model
			});
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