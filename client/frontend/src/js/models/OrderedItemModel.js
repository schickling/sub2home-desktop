// Filename: src/js/models/OrderedItemModel.js
define([
	'underscore',
	'backbone',
	'collections/TimelineItemsCollection',
	'collections/OrderedArticlesCollection'
	], function (_, Backbone, TimelineItemsCollection, OrderedArticlesCollection) {

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
			timelineItemsCollection: null

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


			// cascading remove
			// timelineItemsCollection doesn't need to be destoryed
			// since its included in orderedArticlesCollection
			this.on('destroy', this.destroyOrderedArticlesCollection);

			// listeners for total price calculation
			this.initializeListeners();
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('orderedArticlesCollection')) {
				attributes.orderedArticlesCollection = attributes.orderedArticlesCollection.toJSON();
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

			return response;
		},

		destroy: function () {
			this.collection.remove(this);
		},

		isMenuBundle: function () {
			return (this.get('menuBundleModel') !== null);
		},

		isMenu: function () {
			return (this.isMenuBundle() || this.get('orderedArticlesCollection').first().hasBeenUpgraded());
		},

		initializeListeners: function () {

			// bind all ordered articles wheather their price has changed
			var orderedArticlesCollection = this.get('orderedArticlesCollection');

			_.each(orderedArticlesCollection.models, function (orderedArticleModel) {
				this.addOrderedArticleListener(orderedArticleModel);
			}, this);


			// bind listeners in future
			orderedArticlesCollection.on('add', function (orderedArticleModel) {
				this.addOrderedArticleListener(orderedArticleModel);
			}, this);

			orderedArticlesCollection.on('remove', function (orderedArticleModel) {
				orderedArticleModel.off('priceChanged');
			});
		},

		addOrderedArticleListener: function (orderedArticleModel) {
			orderedArticleModel.on('priceChanged', function () {
				this.calculateTotal();
			}, this);
		},

		calculateTotal: function () {
			var total = 0;

			// calculate total for menu bundle
			if (this.isMenuBundle()) {
				console.log('haben wir noch nicht');
			} else {
				var orderedArticlesCollection = this.get('orderedArticlesCollection'),
					baseOrderedArticleModel = orderedArticlesCollection.first(),
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
						}
					});

				}
			}

			// console.log(total);
			this.set('total', total * this.get('amount'));
		},

		destroyOrderedArticlesCollection: function () {

			this.get('orderedArticlesCollection').destroy();

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
		}

	});

	return OrderedItemModel;

});