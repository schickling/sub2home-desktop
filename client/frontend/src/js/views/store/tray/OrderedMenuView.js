// Filename: src/js/views/store/tray/OrderedMenuView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/tray/OrderedArticleMenuView',
    'text!templates/store/tray/OrderedMenuTemplate.html'
    ], function ($, _, Backbone, OrderedArticleMenuView, OrderedMenuTemplate) {

	var OrderedMenuView = Backbone.View.extend({

		/*
		 * this.model: orderedItemModel
		 */

		template: _.template(OrderedMenuTemplate),

		// dom
		$pricetag: null,
		$controls: null,
		$titleContainer: null,

		events: {
			'mouseenter': '_showControls',
			'mouseleave': '_hideControls'
		},

		initialize: function () {
			this._render();
			this._cacheDom();
		},

		_render: function () {
			this.$el.addClass('orderedMenu');

			var json = {
				title: this.model.getMenuTitle(),
				total: this.model.get('total')
			};

			this.$el.html(this.template(json));

			this._renderArticles();
		},

		_renderArticles: function () {
			var orderedArticlesCollection = this.model.get('orderedArticlesCollection');

			_.each(orderedArticlesCollection.models, function (orderedArticleModel) {
				this._renderArticle(orderedArticleModel.get('articleModel'));
			}, this);
		},

		_renderArticle: function (articleModel) {
			var orderedArticleMenuView = new OrderedArticleMenuView({
				model: articleModel
			});

			this.$('.menuItems').append(orderedArticleMenuView.el);
		},

		_cacheDom: function () {
			this.$pricetag = this.$('.pricetag');
			this.$titleContainer = this.$('.titleContainer');
			this.$controls = this.$('.controls');
		},

		_showControls: function () {
			this.$pricetag.stop().animate({
				right: 110
			}, 200);

			this.$titleContainer.stop().animate({
				marginRight: 210
			}, 200);

			this.$controls.delay(100).stop().fadeIn(100);
		},

		_hideControls: function () {
			this.$pricetag.stop().animate({
				right: 0
			}, 200);

			this.$titleContainer.stop().animate({
				marginRight: 115
			}, 200);

			this.$controls.stop().fadeOut(100);
		}

	});

	return OrderedMenuView;

});