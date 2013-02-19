// Filename: src/js/views/store/assortment/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/store/assortment/CategoriesView',
	'text!templates/store/assortment/MainTemplate.html'
	], function ($, _, Backbone, PageView, CategoriesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html(MainTemplate);

			this._renderCategories();

			this.append();

		},

		_renderCategories: function() {
			new CategoriesView({
				el: this.$('.categories')
			});
		}

	});

	return MainView;

});