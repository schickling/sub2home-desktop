// Filename: src/js/views/store/selection/MainView.js
define([
    'jquery',
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
    'views/store/selection/timeline/TimelineView',
    'text!templates/store/selection/MainTemplate.html'
    ], function ($, _, Backbone, cartModel, ArticleModel, MenuBundleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, TimelineView, MainTemplate) {

	var MainView = PageView.extend({

		orderedItemModel: null,

		events: {
			'mouseenter .timeline': '_slideTimelineUp',
			'mouseleave .timeline': '_slideTimelineDown'
		},

		// referenced sub views
		subViews: {
			timelineControllerView: null,
			orderedArticlesView: null
		},

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

					console.log(articleModel.toJSON());

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


					console.log(menuBundleModel.toJSON());

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
				this._render();
				this._unlockTimelineItemsOnEdit();
			} else {
				this.pageNotFound();
			}

		},

		_render: function () {

			// render template
			this.$el.html(MainTemplate);

			// append to body
			this.append();

			// add cart timeline item
			this._renderCartTimelineItem();

			// render ordered articles
			this._renderOrderedArticles();

			// initalize TimelineControllerView
			this._initializeTimelineController();

		},

		_renderCartTimelineItem: function () {
			var timelineItemsCollection = new TimelineItemsCollection({
				isDisabled: true,
				icon: 'iCart'
			});

			var $timeline = this.$('.note.timeline');

			new TimelineView({
				collection: timelineItemsCollection,
				el: $timeline
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
			this.$('.timeline, .stage.overlay').stop().animate({
				bottom: 0
			}, 300);
		},

		_slideTimelineDown: function () {
			this.$('.timeline, .stage.overlay').stop().animate({
				bottom: -50
			}, 300);
		},

		_unlockTimelineItemsOnEdit: function () {

		}


	});

	return MainView;

});