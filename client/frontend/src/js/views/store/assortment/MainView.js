// Filename: src/js/views/store/assortment/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'views/PageView',
	'views/store/assortment/CategoriesView',
	'text!templates/store/assortment/MainTemplate.html'
	], function ($, _, Backbone, router, stateModel, PageView, CategoriesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {

			// to be absolutly consistent reload the store model from server
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				async: false
			});

			// check if client is allowed to view this page
			if (stateModel.clientOwnsThisStore()) {
				this._render();
			} else {
				router.navigate('login', {
					trigger: true,
					replace: true
				});
			}

		},

		__render: function () {

			this.$el.html(MainTemplate);

			this.__renderCategories();

			this.append();

		},

		__renderCategories: function () {
			new CategoriesView({
				el: this.$('.categories')
			});
		}

	});

	return MainView;

});