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

		className: 'article',

		template: _.template(ArticleDetailsTemplate),

		events: {
			'click': 'showDetails'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
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