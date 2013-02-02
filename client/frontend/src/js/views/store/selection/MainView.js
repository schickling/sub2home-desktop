// Filename: src/js/views/store/selection/MainView.js
define([
	'jquery',
	'jqueryEventSpecialDestroyed',
	'underscore',
	'backbone',
	'models/stateModel',
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
	], function ($, jqueryEventSpecialDestroyed, _, Backbone, stateModel, cartModel, ArticleModel, MenuBundleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, TimelineView, MainTemplate) {

	var MainView = PageView.extend({

		orderedItemModel: null,

		events: {
			'mouseenter .timeline': 'slideTimelineUp',
			'mouseleave .timeline': 'slideTimelineDown'
		},

		initialize: function () {

			// load ordered item and render
			if (stateModel.get('selectionRessourceType') === 'artikel') {
				this.createOrderedItemFromArticle();
			} else if (stateModel.get('selectionRessourceType') === 'menu') {
				this.createOrderedItemFromMenuBundle();
			} else {
				this.loadOrderedItemFromLocalStorage();
			}

			// destory whole view if element gets destroyed
			var self = this;
			this.$el.on('destroyed', function () {
				self.prepareDestroy();
			});

		},

		createOrderedItemFromArticle: function () {
			var self = this;

			// fetch article from server
			var articleModel = new ArticleModel({
				id: stateModel.get('selectionRessourceId')
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

					self.render();
				},

				error: function () {
					// self.pageNotFound();
				}
			});
		},

		createOrderedItemFromMenuBundle: function () {
			var self = this;

			// fetch menuBundleModel from server
			var menuBundleModel = new MenuBundleModel({
				id: stateModel.get('selectionRessourceId')
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

					self.render();
				},

				error: function () {
					// self.pageNotFound();
				}
			});
		},

		loadOrderedItemFromLocalStorage: function () {
			// fetch from localStorage
			var orderedItemsCollection = cartModel.get('orderedItemsCollection');

			this.orderedItemModel = orderedItemsCollection.get(stateModel.get('selectionRessourceId'));

			console.log(this.orderedItemModel);

			this.render();

		},

		render: function () {

			// render template
			this.$el.html(MainTemplate);

			// append to body
			this.append();

			// add cart timeline item
			this.renderCartTimelineItem();

			// render ordered articles
			this.renderOrderedArticles();

			// initalize TimelineControllerView
			this.initializeTimelineController();

		},

		renderCartTimelineItem: function () {
			var timelineItemsCollection = new TimelineItemsCollection({
				disabled: true,
				icon: 'iCart'
			});

			var $timeline = this.$('.note.timeline');

			new TimelineView({
				collection: timelineItemsCollection,
				el: $timeline
			});
		},

		renderOrderedArticles: function () {
			new OrderedArticlesView({
				collection: this.orderedItemModel.get('orderedArticlesCollection'),
				el: this.$el
			});
		},

		initializeTimelineController: function () {
			new TimelineControllerView({
				model: this.orderedItemModel,
				collection: this.orderedItemModel.get('timelineItemsCollection'),
				el: this.$el
			});

		},

		slideTimelineUp: function () {
			this.$('.timeline, .stage.overlay').stop().animate({
				bottom: 0
			}, 300);
		},

		slideTimelineDown: function () {
			this.$('.timeline, .stage.overlay').stop().animate({
				bottom: -50
			}, 300);
		},

		prepareDestroy: function () {

			// TODO
			this.orderedItemModel = null;
			// this.orderedItemModel.destroy();
		}

	});

	return MainView;

});