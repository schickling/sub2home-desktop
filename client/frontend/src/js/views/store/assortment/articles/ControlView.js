// Filename: src/js/views/store/assortment/articles/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/assortment/articles/ControlTemplate.html'
    ], function ($, _, Backbone, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllArticles',
			'click .hideAll': '_hideAllArticles'
		},

		numberOfCurrentRequests: 0,
		numberOfArticles: 0,

		initialize: function () {
			this._render();
			this._countArticles();
		},

		_render: function () {
			this.$el.html(ControlTemplate);
		},

		_countArticles: function () {
			var numberOfArticles = 0;

			_.each(this.collection.models, function (categoryModel) {
				numberOfArticles += categoryModel.get('articlesCollection').length;
			});

			this.numberOfArticles = numberOfArticles;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (categoryModel) {
				var articlesCollection = categoryModel.get('articlesCollection');

				_.each(articlesCollection.models, function (articleModel) {

					// check if price reset is needed
					if (articleModel.get('price') !== articleModel.get('customPrice')) {
						this._updateArticleModel(articleModel, {
							customPrice: articleModel.get('price')
						});
					}

				}, this);
			}, this);
		},

		_showAllArticles: function () {
			_.each(this.collection.models, function (categoryModel) {
				var articlesCollection = categoryModel.get('articlesCollection');

				_.each(articlesCollection.models, function (articleModel) {

					// check if activation needed
					if (!articleModel.get('isActive')) {
						this._updateArticleModel(articleModel, {
							isActive: true
						});
					}

				}, this);
			}, this);
		},

		_hideAllArticles: function () {
			_.each(this.collection.models, function (categoryModel) {
				var articlesCollection = categoryModel.get('articlesCollection');

				_.each(articlesCollection.models, function (articleModel) {

					// check if deactivation needed
					if (articleModel.get('isActive')) {
						this._updateArticleModel(articleModel, {
							isActive: false
						});
					}

				}, this);
			}, this);
		},

		_updateArticleModel: function (articleModel, changedAttributes) {

			var self = this;

			this.numberOfCurrentRequests++;

			articleModel.save(changedAttributes, {
				success: function () {
					self.numberOfCurrentRequests--;
					self._updateLoadBar();

					articleModel.trigger('renderAgain');
				}
			});
		},

		_updateLoadBar: function () {
			var progress = 1 - this.numberOfCurrentRequests / this.numberOfArticles;
			console.log(progress);
		}

	});

	return ControlView;

});