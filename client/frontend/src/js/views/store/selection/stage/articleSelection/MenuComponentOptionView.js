// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/articleSelection/MenuComponentOptionArticlesView',
	'text!templates/store/selection/stage/articleSelection/MenuComponentOptionTemplate.html'
	], function ($, _, Backbone, MenuComponentOptionArticlesView, MenuComponentOptionTemplate) {

	var MenuComponentOptionView = Backbone.View.extend({

		className: 'menuComponentOption',

		template: _.template(MenuComponentOptionTemplate),

		initialize: function() {
			this.orderedArticleModel = this.options.orderedArticleModel;
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			var menuComponentOptionArticlesView = new MenuComponentOptionArticlesView({
				collection: this.model.get('menuComponentOptionArticlesCollection'),
				orderedArticleModel: this.orderedArticleModel,
				el: this.$('.articles')
			});

			return this;
		}

	});

	return MenuComponentOptionView;

});