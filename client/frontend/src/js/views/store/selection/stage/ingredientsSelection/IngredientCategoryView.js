// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientCategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/SlideView',
	'views/store/selection/stage/ingredientsSelection/IngredientsView'
	], function ($, _, Backbone, SlideView, IngredientsView) {

	var IngredientCategoryView = SlideView.extend({

		afterInitialize: function () {

			// add class
			this.$el.addClass('ingredientCategory');

			// render ingredients
			this.renderIngredients();

		},

		renderIngredients: function () {
			var ingredientsView = new IngredientsView({
				collection: this.model.get('ingredientsCollection'),
				model: this.model,
				el: this.$el
			});
		}

	});

	return IngredientCategoryView;

});