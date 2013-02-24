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

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(ControlTemplate);
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
			articleModel.save(changedAttributes, {
				success: function () {
					articleModel.trigger('renderAgain');
				}
			});
		}

	});

	return ControlView;

});