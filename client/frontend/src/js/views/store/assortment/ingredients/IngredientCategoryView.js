// Filename: src/js/views/store/assortment/ingredients/IngredientCategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/ingredients/IngredientsView',
	'text!templates/store/assortment/ingredients/IngredientCategoryTemplate.html'
	], function ($, _, Backbone, IngredientsView, IngredientCategoryTemplate) {

	var IngredientCategoryView = Backbone.View.extend({

		className: 'ingredientCategory',

		template: _.template(IngredientCategoryTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			this._renderIngredients();
		},

		_renderIngredients: function() {
			new IngredientsView({
				el: this.$('.ingredients'),
				collection: this.model.get('ingredientsCollection')
			});
		}

	});

	return IngredientCategoryView;

});