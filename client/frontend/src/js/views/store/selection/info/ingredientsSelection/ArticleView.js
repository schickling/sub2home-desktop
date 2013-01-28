// Filename: src/js/views/store/selection/ArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html'
	], function($, _, Backbone, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		template: _.template(ArticleTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			var json = {
				price: this.model.get('price'),
				image: this.model.get('largeImage'),
				title: this.model.get('title'),
				description: this.model.get('description')
			};

			this.$el.html(this.template(json));
		}

	});

	return ArticleView;

});