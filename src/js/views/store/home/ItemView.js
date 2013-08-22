// Filename: src/js/views/store/home/ItemView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'router',
    'models/cartModel',
    'models/ArticleModel',
    'models/OrderedItemModel',
    'views/store/home/ArticleDetailsView',
    'text!templates/store/home/ItemTemplate.html'
    ], function ($, _, Backbone, notificationcenter, router, cartModel, ArticleModel, OrderedItemModel, ArticleDetailsView, ItemTemplate) {

	"use strict";

	var ItemView = Backbone.View.extend({

		template: _.template(ItemTemplate),

		className: 'item',

		events: {
			'click .itemPreview, .itemDescription, h3': '_showDetails'
		},

		initialize: function () {
			this._render();
			this._waitForImage();
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

		_waitForImage: function () {
			var $imagePlaceholder = this.$('.imagePlaceholder');

			this.$('img').one('load', function () {
				$imagePlaceholder.hide();
			}).each(function () {
				if (this.complete) $(this).load();
			});
		},

		_getImageClass: function () {
			var image = this.model.get('largeImage'),
				imageWithoutFileExtension = image.substr(0, image.lastIndexOf('.'));

			return imageWithoutFileExtension.split('-').pop() || '';
		},

		_showDetails: function () {

			if (this.model.has('allowsIngredients')) { // article model

				if (this.model.get('allowsIngredients')) {

					if (this.model.get('attachedItemsCollection')) { // article has related article

						var articleDetailsView = new ArticleDetailsView({
							model: this.model
						});

						// TODO check if item is too close to border

						this.$el.append(articleDetailsView.el);


					} else { // just go to selection

						router.navigate('store/theke/artikel/' + this.model.get('id'), true);

					}

				} else {
					this._putArticleInCart();
				}

			} else { // menu bundle model

				router.navigate('store/theke/menu/' + this.model.get('id'), true);

			}

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

			notificationcenter.notify('views.store.home.addedOrderedItemToCart');
		}

	});

	return ItemView;

});