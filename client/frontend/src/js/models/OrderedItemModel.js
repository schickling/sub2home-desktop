// Filename: src/js/models/OrderedItemModel.js
define([
    'underscore',
    'backbone',
    'models/MenuBundleModel',
    'collections/TimelineItemsCollection',
    'collections/OrderedArticlesCollection'
    ], function (_, Backbone, MenuBundleModel, TimelineItemsCollection, OrderedArticlesCollection) {

	var OrderedItemModel = Backbone.Model.extend({

		defaults: {

			// needed to be overwritten by unique id
			id: 0,

			amount: 1,

			total: 0,

			menuBundleModel: null,

			orderedArticlesCollection: null,

			// gathers all timeline items of all ordered articles in right order
			// gets filled in each selection view
			timelineItemsCollection: null,

			isInCart: false

		},

		initialize: function () {

			// generate unique id
			if (this.get('id') === 0) {
				this.set({
					id: _.uniqueId()
				}, {
					silent: true
				});
			}


			if (!this.get('orderedArticlesCollection')) {
				this.set('orderedArticlesCollection', new OrderedArticlesCollection());
			}

			if (!this.get('timelineItemsCollection')) {
				this.set('timelineItemsCollection', new TimelineItemsCollection());
			}

			// listeners for total price calculation
			this._initializeListeners();
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('orderedArticlesCollection')) {
				attributes.orderedArticlesCollection = attributes.orderedArticlesCollection.toJSON();
			}

			if (this.get('menuBundleModel')) {
				attributes.menuBundleModel = attributes.menuBundleModel.toJSON();
			}

			delete attributes.timelineItemsCollection;

			return attributes;
		},

		// copied to orderedItemCollection because of cyclic dependencies
		parse: function (response) {

			if (response.hasOwnProperty('orderedArticlesCollection')) {
				response.orderedArticlesCollection = new OrderedArticlesCollection(response.orderedArticlesCollection, {
					// parse needed for nested articleModel
					parse: true
				});

				// set back reference
				_.each(response.orderedArticlesCollection.models, function (orderedArticleModel) {
					orderedArticleModel.set({
						orderedItemModel: this
					}, {
						silent: true
					});
				}, this);
			}

			if (response.hasOwnProperty('menuBundleModel') && response.menuBundleModel) {
				response.menuBundleModel = new MenuBundleModel(response.menuBundleModel, {
					// parse needed for nested articleModel
					parse: true
				});
			}

			return response;
		},

		// needed if an ordered items gets deleted from cart
		destroy: function () {
			this.collection.remove(this);
		},

		isMenuBundle: function () {
			return this.get('menuBundleModel') !== null;
		},

		isMenu: function () {
			return this.isMenuBundle() || this.get('orderedArticlesCollection').first().hasBeenUpgraded();
		},

		// remove ordered articles belonging to an old menu upgrade
		reduceOrderedArticles: function () {
			var orderedArticlesCollection = this.get('orderedArticlesCollection'),
				orderedArticleModel;

			for (var i = 0; i < orderedArticlesCollection.length; i++) {
				orderedArticleModel = orderedArticlesCollection.models[i];
				if (!orderedArticleModel.isMenuUpgradeBase()) {
					orderedArticleModel.destroy();
					i--;
				}
			}
		},

		getMenuTitle: function () {
			if (this.isMenuBundle()) {
				var menuBundleModel = this.get('menuBundleModel');
				return menuBundleModel.get('title');
			} else {
				var firstOrderedArticleModel = this.get('orderedArticlesCollection').first(),
					menuUpgradeModel = firstOrderedArticleModel.get('menuUpgradeModel');
				return menuUpgradeModel.get('title');
			}
		},

		_initializeListeners: function () {

			this._listenToAmount();

			// bind all ordered articles wheather their price has changed
			var orderedArticlesCollection = this.get('orderedArticlesCollection');

			_.each(orderedArticlesCollection.models, function (orderedArticleModel) {
				this._addOrderedArticleListener(orderedArticleModel);
			}, this);


			// bind listeners in future
			orderedArticlesCollection.on('add', function (orderedArticleModel) {
				this._addOrderedArticleListener(orderedArticleModel);
			}, this);

			orderedArticlesCollection.on('remove', function (orderedArticleModel) {
				orderedArticleModel.off('priceChanged');
			});

			this.on('recalculate', this._calculateTotal, this);
		},

		_listenToAmount: function () {
			this.on('change:amount', this._calculateTotal, this);
		},

		_addOrderedArticleListener: function (orderedArticleModel) {
			orderedArticleModel.on('priceChanged', this._calculateTotal, this);
		},

		_calculateTotal: function () {
			var total = 0,
				orderedArticlesCollection = this.get('orderedArticlesCollection');

			// calculate total for menu bundle
			if (this.isMenuBundle()) {

				var menuBundleModel = this.get('menuBundleModel');

				total = menuBundleModel.get('price');

				_.each(orderedArticlesCollection.models, function (orderedArticleModel) {
					var articleModel = orderedArticleModel.get('articleModel');

					if (articleModel) {
						total += articleModel.get('ingredientsTotal');
						total += articleModel.get('deposit');
					}
				});

			} else {

				var baseOrderedArticleModel = orderedArticlesCollection.first(),
					baseArticleModel = baseOrderedArticleModel.get('articleModel');

				// calculate total of base article
				total += baseArticleModel.get('total');

				// calculate total for menu upgrade
				if (baseOrderedArticleModel.hasBeenUpgraded()) {
					var menuUpgradeOrderedArticleModels = orderedArticlesCollection.without(baseOrderedArticleModel);

					_.each(menuUpgradeOrderedArticleModels, function (menuUpgradeOrderedArticleModel) {
						var menuUpgradeArticleModel = menuUpgradeOrderedArticleModel.get('articleModel');

						if (menuUpgradeArticleModel) {
							total += menuUpgradeArticleModel.get('ingredientsTotal');
							total += menuUpgradeArticleModel.get('deposit');
						}
					});

				}

			}

			// console.log(total);
			this.set('total', total * this.get('amount'));
		}

	});

	return OrderedItemModel;

});