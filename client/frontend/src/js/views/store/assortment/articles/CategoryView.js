// Filename: src/js/views/store/assortment/CategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/articles/ArticlesView',
	'text!templates/store/assortment/articles/CategoryTemplate.html'
	], function ($, _, Backbone, ArticlesView, CategoryTemplate) {

	var CategoryView = Backbone.View.extend({

		className: 'category',

		template: _.template(CategoryTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			this._renderArticles();
		},

		_renderArticles: function() {
			new ArticlesView({
				el: this.$('.articles'),
				collection: this.model.get('articlesCollection')
			});
		}

	});

	return CategoryView;

});