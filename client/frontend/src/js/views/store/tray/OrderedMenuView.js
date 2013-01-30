// Filename: src/js/views/store/tray/OrderedMenuView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/tray/OrderedArticleMenuView',
	'text!templates/store/tray/OrderedMenuTemplate.html'
	], function ($, _, Backbone, OrderedArticleMenuView, OrderedMenuTemplate) {

	var OrderedMenuView = Backbone.View.extend({

		template: _.template(OrderedMenuTemplate),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.addClass('orderedMenu');

			var json = {
				title: 'Sparmenu'
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
			var orderedArticleMenuView = new OrderedArticleMenuView({
				model: articleModel
			});

			this.$('.menuItems').append(orderedArticleMenuView.el);
		}

	});

	return OrderedMenuView;

});