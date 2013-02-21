// Filename: src/js/views/store/assortment/ArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/assortment/articles/ArticleTemplate.html'
	], function ($, _, Backbone, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		className: 'article',

		template: _.template(ArticleTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('price'),
				info: this.model.get('info'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyedInStore'),
				image: this.model.get('smallImage')
			};

			this.$el.html(this.template(json));
		}

	});

	return ArticleView;

});