define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'text!templates/store/home/ArticleTemplate.html'
	], function ($, _, Backbone, router, stateModel, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		events: {
			'click': 'takeArticle'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(_.template(ArticleTemplate, this.model.toJSON()));
			this.$el.addClass('article');
		},

		takeArticle: function () {
			if (this.model.get('allowsIngredients')) {
				router.navigate('store/theke/artikel/' + this.model.get('articleId'), true);
			} else {
				alert('Warenkorb yo!');
			}
		}

	});

	return ArticleView;

});