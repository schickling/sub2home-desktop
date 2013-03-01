// Filename: src/js/views/store/selection/info/ingredientsSelection/ArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html'
	], function($, _, Backbone, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		template: _.template(ArticleTemplate),

		initialize: function() {
			this._render();
		},

		_render: function() {
			var json = {
				price: this.model.get('price'),
				image: this.model.get('largeImage'),
				title: this.model.get('title'),
				description: this.model.get('description')
			};

			this.$el.html(this.template(json));

			this.$el.addClass(this._getImageClass());
		},

		_getImageClass: function () {
			var image = this.model.get('largeImage'),
				imageWithoutFileExtension = image.substr(0, image.lastIndexOf('.'));

			return imageWithoutFileExtension.split('-').pop() || '';
		}

	});

	return ArticleView;

});