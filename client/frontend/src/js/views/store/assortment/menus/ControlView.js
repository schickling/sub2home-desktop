// Filename: src/js/views/store/assortment/menus/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/assortment/menus/ControlTemplate.html'
    ], function ($, _, Backbone, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllArticles'
		},

		numberOfCurrentRequests: 0,
		numberOfArticles: 0,

		$loader: null,
		$loadbar: null,

		initialize: function () {
			this._render();
			this._countArticles();
			this._cacheDom();
		},

		_render: function () {
			this.$el.html(ControlTemplate);
		},

		_countArticles: function () {
			var numberOfArticles = 0;

			_.each(this.collection.models, function (categoryModel) {
				numberOfArticles += categoryModel.get('menusCollection').length;
			});

			this.numberOfArticles = numberOfArticles;
		},

		_cacheDom: function () {
			this.$loader = this.$('#loader');
			this.$loadbar = this.$loader.find('#loadbar');
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (categoryModel) {
				var menusCollection = categoryModel.get('menusCollection');

				_.each(menusCollection.models, function (articleModel) {

					// check if price reset is needed
					if (articleModel.get('price') !== articleModel.get('customPrice')) {
						this._updateArticleModel(articleModel, {
							customPrice: articleModel.get('price')
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

		},

		_showAllArticles: function () {
			_.each(this.collection.models, function (categoryModel) {
				var menusCollection = categoryModel.get('menusCollection');

				_.each(menusCollection.models, function (articleModel) {

					// check if activation needed
					if (!articleModel.get('isActive')) {
						this._updateArticleModel(articleModel, {
							isActive: true
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

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
			var progress = 1 - this.numberOfCurrentRequests / this.numberOfArticles,
				relativeWidth = progress * 100 + '%';

			if (progress < 1) {
				this.$loader.fadeIn();
			} else {
				this.$loader.fadeOut();
			}

			this.$loadbar.width(relativeWidth);
		}

	});

	return ControlView;

});