// Filename: src/js/views/store/assortment/CategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/CategoriesCollection',
	'views/store/assortment/CategoryView'
	], function ($, _, Backbone, CategoriesCollection, CategoryView) {

	var CategoriesView = Backbone.View.extend({

		initialize: function () {
			this.collection = new CategoriesCollection();
			this.collection.fetch({
				async: false,
				data: $.param({
					showAllItems: true
				})
			});

			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (categoryModel) {
				this._renderCategory(categoryModel);
			}, this);
		},

		_renderCategory: function (categoryModel) {
			var categoryView = new CategoryView({
				model: categoryModel
			});

			this.$el.append(categoryView.el);
		}

	});

	return CategoriesView;

});