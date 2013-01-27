// Filename: src/js/models/OrderedArticleModel.js
define([
	'underscore',
	'backbone',
	'models/ArticleModel',
	'models/MenuUpgradeModel',
	'models/MenuComponentBlockModel',
	'collections/IngredientCategoriesCollection'
	], function (_, Backbone, ArticleModel, MenuUpgradeModel, MenuComponentBlockModel, IngredientCategoriesCollection) {

	var OrderedArticleModel = Backbone.Model.extend({
		defaults: {

			// ordered item which this belongs to
			orderedItemModel: null,

			// selected article model (may be predetermined)
			articleModel: null,

			// only contained by a base article
			menuUpgradeModel: null,

			// not contained by a base article
			menuComponentBlockModel: null

		},

		initialize: function () {
			// listen for current and further article models
			this.on('change:articleModel', function () {
				var previousArticleModel = this.previous('articleModel'),
					articleModel = this.get('articleModel');

				// initalize total of ordered item model by firing priceChanged event
				this.trigger('priceChanged');

				// remove old listener
				if (previousArticleModel) {
					previousArticleModel.off('change:total');
				}

				// bind new listener
				articleModel.on('change:total', function () {
					this.trigger('priceChanged');
				}, this);

			}, this);
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('articleModel')) {
				attributes.articleModel = attributes.articleModel.toJSON();
			}

			if (this.get('menuUpgradeModel')) {
				attributes.menuUpgradeModel = attributes.menuUpgradeModel.toJSON();
			}

			if (this.get('menuComponentBlockModel')) {
				attributes.menuComponentBlockModel = attributes.menuComponentBlockModel.toJSON();
			}

			delete attributes.orderedItemModel;

			return attributes;
		},

		parse: function (response) {

			if (response.hasOwnProperty('articleModel') && response.articleModel !== null) {
				response.articleModel = new ArticleModel(response.articleModel, {
					parse: true
				});
			}

			if (response.hasOwnProperty('menuUpgradeModel') && response.menuUpgradeModel !== null) {
				response.menuUpgradeModel = new MenuUpgradeModel(response.menuUpgradeModel, {
					parse: true
				});
			}

			if (response.hasOwnProperty('menuComponentBlockModel') && response.menuComponentBlockModel !== null) {
				response.menuComponentBlockModel = new MenuComponentBlockModel(response.menuComponentBlockModel, {
					parse: true
				});
			}

			return response;
		},

		isMenuUpgradeBase: function () {
			return (this.get('menuComponentBlockModel') === null);
		},

		hasBeenUpgraded: function () {
			return (this.get('menuUpgradeModel') !== null);
		}

	});

	return OrderedArticleModel;

});