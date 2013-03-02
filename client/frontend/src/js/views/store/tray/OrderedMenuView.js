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

		events: {
			'mouseenter': '_showControls',
			'mouseleave': '_hideControls'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.addClass('orderedMenu');

			var json = {
				title: this.model.getMenuTitle(),
				total: this.model.get('total')
			};

			this.$el.html(this.template(json));

			this.renderArticles();
		},

		renderArticles: function () {
			var orderedArticlesCollection = this.model.get('orderedArticlesCollection');

			_.each(orderedArticlesCollection.models, function (orderedArticleModel) {
				this.renderArticle(orderedArticleModel.get('articleModel'));
			}, this);
		},

		renderArticle: function (articleModel) {
			console.log(articleModel);
			var orderedArticleMenuView = new OrderedArticleMenuView({
				model: articleModel
			});

			this.$('.menuItems').append(orderedArticleMenuView.el);
		},

		_showControls: function () {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 110
			}, 200);

			$controls.delay(100).stop().fadeIn(100);
		},

		_hideControls: function () {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 15
			}, 200);

			$controls.stop().fadeOut(100);
		}

	});

	return OrderedMenuView;

});