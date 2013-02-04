// Filename: src/js/views/store/home/ItemView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/home/ArticleDetailsView',
	'views/store/home/MenuBundleDetailsView',
	'text!templates/store/home/ItemTemplate.html'
	], function ($, _, Backbone, ArticleDetailsView, MenuBundleDetailsView, ItemTemplate) {

	var ItemView = Backbone.View.extend({

		template: _.template(ItemTemplate),

		className: 'item',

		events: {
			'click .itemPreview': 'showDetails'
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
			var detailsView;

			if (this.model.has('allowsIngredients')) {
				detailsView = new ArticleDetailsView({
					model: this.model
				});
			} else {
				detailsView = new MenuBundleDetailsView({
					model: this.model
				});
			}

			this.$el.append(detailsView.el);

			// check if item is too close to border
		}

	});

	return ItemView;

});