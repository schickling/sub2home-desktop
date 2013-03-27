// Filename: src/js/views/store/assortment/articles/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView',
    ], function ($, _, Backbone, ControlBaseView) {

	var ControlView = ControlBaseView.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllArticles'
		},

		_countItems: function () {
			var numberOfItems = 0;

			_.each(this.collection.models, function (categoryModel) {
				numberOfItems += categoryModel.get('articlesCollection').length;
			});

			this.numberOfItems = numberOfItems;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (categoryModel) {
				var articlesCollection = categoryModel.get('articlesCollection');

				_.each(articlesCollection.models, function (articleModel) {

					// check if price reset is needed
					if (articleModel.get('price') !== articleModel.get('customPrice')) {
						this._updateModel(articleModel, {
							customPrice: articleModel.get('price')
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

		},

		_showAllArticles: function () {
			_.each(this.collection.models, function (categoryModel) {
				var articlesCollection = categoryModel.get('articlesCollection');

				_.each(articlesCollection.models, function (articleModel) {

					// check if activation needed
					if (!articleModel.get('isActive')) {
						this._updateModel(articleModel, {
							isActive: true
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

		}

	});

	return ControlView;

});