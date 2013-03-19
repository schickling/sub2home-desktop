// Filename: src/js/views/store/assortment/articles/CategoriesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'global',
    'collections/CategoriesCollection',
    'views/store/assortment/SectionBaseView',
    'views/store/assortment/articles/CategoryView',
    'views/store/assortment/articles/ControlView'
    ], function ($, _, Backbone, global, CategoriesCollection, SectionBaseView, CategoryView, ControlView) {

	var CategoriesView = SectionBaseView.extend({

		controlViewClass: ControlView,
		collectionClass: CategoriesCollection,

		className: 'articles',

		_fetchCollection: function () {
			var self = this;

			this.collection.fetch({

				url: '/api/frontend/stores/' + global.getStoreAlias() + '/categories/assortment', // use custom route

				success: function () {
					self._renderContent();
				}

			});
		},

		_renderContent: function () {
			_.each(this.collection.models, function (categoryModel) {
				this._renderCategory(categoryModel);
			}, this);
		},

		_renderCategory: function (categoryModel) {
			var categoryView = new CategoryView({
				model: categoryModel
			});

			this.$content.append(categoryView.el);
		}

	});

	return CategoriesView;

});