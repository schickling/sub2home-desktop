// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/articleSelection/MenuComponentOptionArticleView'
	], function ($, _, Backbone, MenuComponentOptionArticleView) {

	var MenuComponentOptionArticlesView = Backbone.View.extend({

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (menuComponentOptionArticleModel) {
				this.renderArticle(menuComponentOptionArticleModel);
			}, this);
		},

		renderArticle: function (menuComponentOptionArticleModel) {
			var menuComponentOptionArticleView = new MenuComponentOptionArticleView({
				model: menuComponentOptionArticleModel,
				orderedArticleModel: this.orderedArticleModel
			});

			this.$el.append(menuComponentOptionArticleView.render().el);
		}

	});

	return MenuComponentOptionArticlesView;

});