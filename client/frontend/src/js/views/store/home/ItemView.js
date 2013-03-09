// Filename: src/js/views/store/home/ItemView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'models/cartModel',
    'models/ArticleModel',
    'models/OrderedItemModel',
    'views/store/home/ArticleDetailsView',
    'views/store/home/MenuBundleDetailsView',
    'text!templates/store/home/ItemTemplate.html'
    ], function ($, _, Backbone, notificationcenter, cartModel, ArticleModel, OrderedItemModel, ArticleDetailsView, MenuBundleDetailsView, ItemTemplate) {

	var ItemView = Backbone.View.extend({

		template: _.template(ItemTemplate),

		className: 'item',

		events: {
			'click .itemPreview': '_showDetails'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				image: this.model.get('largeImage'),
				description: this.model.get('description'),
				price: this.model.get('price'),
				deposit: (this.model.get('deposit') || 0) * 100 // cent
			};

			this.$el.html(this.template(json));

			this.$el.addClass(this._getImageClass());
		},

		_getImageClass: function () {
			var image = this.model.get('largeImage'),
				imageWithoutFileExtension = image.substr(0, image.lastIndexOf('.'));

			return imageWithoutFileExtension.split('-').pop() || '';
		},

		_showDetails: function () {
			var detailsView;

			if (this.model.has('allowsIngredients')) {
				if (this.model.get('allowsIngredients')) {
					detailsView = new ArticleDetailsView({
						model: this.model
					});
				} else {
					this._putArticleInCart();
					return;
				}
			} else {
				detailsView = new MenuBundleDetailsView({
					model: this.model
				});
			}

			this.$el.append(detailsView.el);

			// check if item is too close to border
		},

		_putArticleInCart: function () {
			var orderedItemModel = new OrderedItemModel(),
				orderedArticlesCollection = orderedItemModel.get('orderedArticlesCollection'),
				articleModel = new ArticleModel({
					id: this.model.get('id')
				});

			articleModel.fetch({
				async: false
			});

			orderedArticlesCollection.add({
				articleModel: articleModel
			});

			cartModel.addOrderedItemModel(orderedItemModel);

			notificationcenter.notify('store.home.addedOrderedItemToCart');
		}

	});

	return ItemView;

});