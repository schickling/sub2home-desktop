// Filename: src/js/views/store/home/ArticleDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'text!templates/store/home/ArticleDetailsTemplate.html'
	], function ($, _, Backbone, router, stateModel, ArticleDetailsTemplate) {

	var ArticleDetailsView = Backbone.View.extend({

		className: 'detailsArticle',

		hideTimer: 0,

		template: _.template(ArticleDetailsTemplate),

		events: {
			'click': 'showDetails',
			'mouseleave': 'hide',
			'mouseenter': 'stopHiding'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			var json = {
				title: this.model.get('title'),
				image: this.model.get('largeImage'),
				description: this.model.get('description'),
				price: this.model.get('price')
			};

			this.$el.html(this.template(json));
		},

		showDetails: function () {
			if (this.model.get('allowsIngredients')) {
				router.navigate('store/theke/artikel/' + this.model.get('id'), true);
			} else {
				alert('Warenkorb yo!');
			}
		},

		hide: function () {
			var self = this;

			this.hideTimer = setTimeout(function () {
				self.$el.fadeOut(function () {
					self.remove();
				});
			}, 300);
		},

		stopHiding: function () {
			clearTimeout(this.hideTimer);
		}

	});

	return ArticleDetailsView;

});