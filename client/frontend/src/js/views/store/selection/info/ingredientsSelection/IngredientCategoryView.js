 // Filename: src/js/views/store/selection/info/IngredientCategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/ingredientsSelection/IngredientsView',
	'text!templates/store/selection/info/ingredientsSelection/IngredientCategoryTemplate.html'
	], function ($, _, Backbone, IngredientsView, IngredientCategoryTemplate) {

	var IngredientCategoryView = Backbone.View.extend({

		className: 'ingredientCategory',

		template: _.template(IngredientCategoryTemplate),

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			
			var ingredientsView = new IngredientsView({
				collection: this.model.get('ingredientsCollection'),
				el: this.$('.ingredients')
			});

			return this;
		}

	});

	return IngredientCategoryView;

});