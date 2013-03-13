// Filename: src/js/views/store/assortment/articles/CategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/CategoriesCollection',
	'views/store/assortment/articles/CategoryView',
	'views/store/assortment/articles/ControlView'
	], function ($, _, Backbone, CategoriesCollection, CategoryView, ControlView) {

	var CategoriesView = Backbone.View.extend({

		$categories: null,

		initialize: function () {
			this.collection = new CategoriesCollection();
			this.collection.fetch({
				async: false,
				data: $.param({
					assortment: true
				})
			});

			this._cacheDom();
			this._renderCategories();
			this._renderControl();
		},

		_cacheDom: function() {
			this.$categories = this.$('#articlesSection');
		},

		_renderCategories: function () {
			_.each(this.collection.models, function (categoryModel) {
				this._renderCategory(categoryModel);
			}, this);
		},

		_renderCategory: function (categoryModel) {
			var categoryView = new CategoryView({
				model: categoryModel
			});

			this.$categories.append(categoryView.el);
		},

		_renderControl: function() {
			new ControlView({
				el: this.$('.assortmentControls'),
				collection: this.collection
			});
		}

	});

	return CategoriesView;

});