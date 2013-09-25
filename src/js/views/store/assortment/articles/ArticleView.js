// Filename: src/js/views/store/assortment/ArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/notificationcenter',
    'views/store/assortment/ItemBaseView',
    'text!templates/store/assortment/articles/ArticleTemplate.html'
    ], function ($, _, Backbone, notificationcenter, ItemBaseView, ArticleTemplate) {

	"use strict";

	var ArticleView = ItemBaseView.extend({

		template: _.template(ArticleTemplate),

		className: 'article',

		_toggleIsActive: function () {
			var articleModel = this.model,
				$eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');

			if (!isActive && this._isLastActiveArticle()) {
				notificationcenter.notify('views.store.assortment.articles.oneActiveArticleNeeded');
				return;
			}

			articleModel.set('isActive', isActive);
			articleModel.save({}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.articles.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.articles.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.articles.error');
					articleModel.set('isActive', !isActive);
				}
			});
		},

		_isLastActiveArticle: function () {
			var activeArticleCounter = 0,
				articleModel = this.model,
				articlesCollection = articleModel.collection,
				categoriesCollection = articlesCollection.categoryModel.collection,
				tempArticlesCollection;

			_.each(categoriesCollection.models, function (tempCategoryModel) {
				tempArticlesCollection = tempCategoryModel.get('articlesCollection');
				_.each(tempArticlesCollection.models, function (tempArticleModel) {
					if (tempArticleModel.get('isActive')) {
						activeArticleCounter++;
					}
				});
			});

			return activeArticleCounter < 2;

		}

	});

	return ArticleView;

});