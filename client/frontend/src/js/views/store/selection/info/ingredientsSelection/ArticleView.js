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
			this.$el.html(this.template(this.model.toJSON()));
		}

	});

	return ArticleView;

});