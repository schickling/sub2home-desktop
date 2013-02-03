// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/ingredientsSelection/IngredientView'
	], function ($, _, Backbone, IngredientView) {

	var IngredientsView = Backbone.View.extend({

		/*
		 * this.model: ingredient category (needed for toggle strategy)
		 */

		initialize: function () {

			this.render();
		},

		render: function () {

			// clean old ingredient views
			var $ingredients = this.$('.ingredients');
			$ingredients.empty();

			this.collection.each(function (ingredientModel) {
				this.renderIngredient(ingredientModel);
			}, this);
		},

		renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});
			ingredientView.parentView = this;

			var $ingredient = ingredientView.render().$el;

			this.$el.append($ingredient);
		},

		notifyOtherIngredients: function (ingredientModel) {
			var otherIngredientsCollection = _(this.collection.without(ingredientModel)),
				isMandatory = this.model.get('isMandatory'),
				isSingle = this.model.get('isSingle');

			// if only one ingredient allowed disable others
			if (isMandatory && isSingle) {
				otherIngredientsCollection.each(function(otherIngredientModel) {
					otherIngredientModel.set('isSelected', false);
				});
			}
		}

	});

	return IngredientsView;

});