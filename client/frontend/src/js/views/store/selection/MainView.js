// Filename: src/js/views/store/selection/MainView.js
define([
	'jquery',
	'jqueryEventSpecialDestroyed',
	'underscore',
	'backbone',
	'models/stateModel',
	'models/cartModel',
	'models/ArticleModel',
	'models/OrderedItemModel',
	'models/OrderedArticleModel',
	'collections/OrderedArticlesCollection',
	'collections/TimelineItemsCollection',
	'views/PageView',
	'views/store/selection/TimelineControllerView',
	'views/store/selection/OrderedArticlesView',
	'views/store/selection/timeline/TimelineView',
	'text!templates/store/selection/MainTemplate.html'
	], function ($, jqueryEventSpecialDestroyed, _, Backbone, stateModel, cartModel, ArticleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, TimelineView, MainTemplate) {

	var MainView = PageView.extend({

		orderedItemModel: null,

		orderedArticlesView: null,

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

			// set width for internal dom calculation
			this.$el.width(window.innerWidth);
			this.$el.height(window.innerHeight);

			// add cart timeline item
			this.renderCartTimelineItem();

			// render ordered articles
			this.renderOrderedArticles();

			// append to body
			this.append();

			// initalize TimelineControllerView
			this.initializeTimelineController();

			// listen for menu upgrade selection
			this.startMenuUpgradeSelectionListener();


		},

		renderCartTimelineItem: function () {
			var timelineItemsCollection = new TimelineItemsCollection({
				disabled: true
			});

			var $timeline = this.$('.note.timeline');

			var timelineView = new TimelineView({
				collection: timelineItemsCollection,
				el: $timeline
			});
		},

		renderOrderedArticles: function () {
			this.orderedArticlesView = new OrderedArticlesView({
				collection: this.orderedItemModel.get('orderedArticlesCollection'),
				el: this.$el
			});
		},

		initializeTimelineController: function () {
			var timelineControllerView = new TimelineControllerView({
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

		selectMenuUpgrade: function (menuUpgradeModel) {

			var orderedArticlesCollection = this.orderedItemModel.get('orderedArticlesCollection');

			// remove ordered articles belonging to an old menu upgrade
			this.orderedItemModel.reduceOrderedArticles();

			// create new ordered articles for each menu component block
			menuUpgradeModel.get('menuComponentBlocksCollection').each(function (menuComponentBlockModel) {

				var orderedArticleModel = new OrderedArticleModel({
					menuComponentBlockModel: menuComponentBlockModel,
					orderedItemModel: this.orderedItemModel
				});

				orderedArticlesCollection.add(orderedArticleModel);
				this.orderedArticlesView.renderOrderedArticle(orderedArticleModel);

			}, this);

		},

		startMenuUpgradeSelectionListener: function () {

			var orderedArticlesCollection = this.orderedItemModel.get('orderedArticlesCollection'),
				baseOrderedArticleModel = orderedArticlesCollection.first();

			// listen for new menu upgrade selection
			baseOrderedArticleModel.on('change:menuUpgradeModel', function () {
				if (baseOrderedArticleModel.get('menuUpgradeModel')) {
					this.selectMenuUpgrade(baseOrderedArticleModel.get('menuUpgradeModel'));
				}
			}, this);
		},

		prepareDestroy: function () {

			// TODO
			this.orderedItemModel = null;
			// this.orderedItemModel.destroy();
		}

	});

	return MainView;

});