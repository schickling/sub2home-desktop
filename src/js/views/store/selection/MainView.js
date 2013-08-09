// Filename: src/js/views/store/selection/MainView.js
define([
    'jquery',
    'jqueryOverscroll',
    'underscore',
    'backbone',
    'models/cartModel',
    'models/ArticleModel',
    'models/MenuBundleModel',
    'models/OrderedItemModel',
    'models/OrderedArticleModel',
    'collections/OrderedArticlesCollection',
    'collections/TimelineItemsCollection',
    'views/PageView',
    'views/store/selection/TimelineControllerView',
    'views/store/selection/OrderedArticlesView',
    'views/store/selection/timeline/CartTimelineView',
    'text!templates/store/selection/MainTemplate.html'
    ], function ($, jqueryOverscroll, _, Backbone, cartModel, ArticleModel, MenuBundleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, CartTimelineView, MainTemplate) {

	"use strict";

	var MainView = PageView.extend({

		orderedItemModel: null,

		events: {
			'mouseenter #timelineNote .container': '_slideTimelineUp',
			'mouseleave #timelineNote .container': '_slideTimelineDown'
		},

		// referenced sub views
		subViews: {
			timelineControllerView: null,
			orderedArticlesView: null
		},

		// cached dom
		$timelineNote: null,
		$timelineContainerWrapper: null,
		$overlay: null,

		initialize: function () {

			var selectionRessourceType = this.options.selectionRessourceType;

			// load ordered item and render
			if (selectionRessourceType === 'artikel') {
				this._createOrderedItemFromArticle();
			} else if (selectionRessourceType === 'menu') {
				this._createOrderedItemFromMenuBundle();
			} else {
				this._loadOrderedItemFromLocalStorage();
			}


		},

		_createOrderedItemFromArticle: function () {
			var self = this;

			// fetch article from server
			var articleModel = new ArticleModel({
				id: this.options.selectionRessourceId
			});

			articleModel.fetch({
				success: function () {

					// check if has ingredients or menu upgrades
					if (!articleModel.get('ingredientCategoriesCollection') && !articleModel.get('menuUpgradesCollection')) {
						self.pageNotFound();
						return;
					}

					// create new ordered article
					var orderedArticleModel = new OrderedArticleModel();

					self.orderedItemModel = new OrderedItemModel({
						orderedArticlesCollection: new OrderedArticlesCollection(orderedArticleModel)
					});

					// append ordered item to ordered article
					orderedArticleModel.set({
						articleModel: articleModel,
						orderedItemModel: self.orderedItemModel
					});

					// set page title
					self.pageTitle = 'Beleg dein ' + articleModel.get('title') + ' - sub2home';

					self._render();
				},

				error: function () {
					self.pageNotFound();
				}
			});
		},

		_createOrderedItemFromMenuBundle: function () {
			var self = this;

			// fetch menuBundleModel from server
			var menuBundleModel = new MenuBundleModel({
				id: this.options.selectionRessourceId
			});

			menuBundleModel.fetch({
				success: function () {

					var menuComponentBlocksCollection = menuBundleModel.get('menuComponentBlocksCollection'),
						orderedArticlesCollection = new OrderedArticlesCollection();


					self.orderedItemModel = new OrderedItemModel({
						orderedArticlesCollection: orderedArticlesCollection,
						menuBundleModel: menuBundleModel
					});


					// create new ordered article for each menu component block
					_.each(menuComponentBlocksCollection.models, function (menuComponentBlockModel) {

						var orderedArticleModel = new OrderedArticleModel({
							menuComponentBlockModel: menuComponentBlockModel,
							orderedItemModel: self.orderedItemModel
						});

						orderedArticlesCollection.add(orderedArticleModel);

					});

					// set page title
					self.pageTitle = 'Vervollständige dein ' + menuBundleModel.get('title') + ' - sub2home';

					self._render();
				},

				error: function () {
					self.pageNotFound();
				}
			});
		},

		_loadOrderedItemFromLocalStorage: function () {
			// fetch from localStorage
			var orderedItemsCollection = cartModel.getOrderedItemsCollection();

			this.orderedItemModel = orderedItemsCollection.get(this.options.selectionRessourceId);

			if (this.orderedItemModel) {

				// set page title
				this.pageTitle = 'Nochmal ändern - sub2home';

				this._render();
			} else {
				this.pageNotFound();
			}

		},

		_render: function () {

			// render template
			this.$el.html(MainTemplate);

			this._cacheDom();

			// append to body
			this.append();

			// add cart timeline item
			this._renderCartTimelineItem();

			// render ordered articles
			this._renderOrderedArticles();

			// initalize TimelineControllerView
			this._initializeTimelineController();

			this._initOverscroll();

		},

		_cacheDom: function () {
			this.$timelineNote = this.$('#timelineNote');
			this.$timelineContainerWrapper = this.$timelineNote.find('#timelineContainerWrapper');
			this.$overlay = this.$('#overlay');
		},

		_initOverscroll: function () {
			// initialize overscroll
			this.$timelineContainerWrapper.overscroll({
				showThumbs: false,
				direction: 'horizontal',
				wheelDirection: 'horizontal',
				ignoreSizing: true
			});
		},

		_renderCartTimelineItem: function () {
			var timelineItemsCollection = new TimelineItemsCollection({
				isDisabled: true,
				icon: 'iCart'
			});

			new CartTimelineView({
				collection: timelineItemsCollection,
				el: this.$timelineNote
			});
		},

		_renderOrderedArticles: function () {
			this.subViews.orderedArticlesView = new OrderedArticlesView({
				collection: this.orderedItemModel.get('orderedArticlesCollection'),
				el: this.$el
			});
		},

		_initializeTimelineController: function () {
			this.subViews.timelineControllerView = new TimelineControllerView({
				model: this.orderedItemModel,
				collection: this.orderedItemModel.get('timelineItemsCollection'),
				el: this.$el
			});
		},

		_slideTimelineUp: function () {
			this.$timelineNote.stop().animate({
				bottom: 0
			}, 300);
		},

		_slideTimelineDown: function () {
			this.$timelineNote.stop().animate({
				bottom: -50
			}, 300);
		}


	});

	return MainView;

});