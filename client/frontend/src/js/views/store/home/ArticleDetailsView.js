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

		template: _.template(ArticleDetailsTemplate),

		events: {
			'click': 'showDetails'
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
		}

	});

	return ArticleDetailsView;

});