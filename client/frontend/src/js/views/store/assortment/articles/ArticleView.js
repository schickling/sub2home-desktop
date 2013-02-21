// Filename: src/js/views/store/assortment/ArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/assortment/articles/ArticleTemplate.html'
	], function ($, _, Backbone, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		className: 'article',

		events: {
			'click': '_toggleIsActive'
		},

		template: _.template(ArticleTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('customPrice'),
				info: this.model.get('info'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyedInStore'),
				image: this.model.get('smallImage')
			};

			this.$el.html(this.template(json));
		},

		_toggleIsActive: function() {
			var $eye = this.$('.bEye'),
				isActive = !this.model.get('isActive');

			$eye.toggleClass('open', isActive);

			this.model.set('isActive', isActive);
			this.model.save();
		}

	});

	return ArticleView;

});