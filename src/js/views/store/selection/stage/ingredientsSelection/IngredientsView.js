// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/ingredientsSelection/IngredientView'
	], function ($, _, Backbone, IngredientView) {

	"use strict";

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

			_.each(this.collection.models, function (ingredientModel) {
				this._renderIngredient(ingredientModel);
			}, this);
		},

		_renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});
			ingredientView.parentView = this;

			this.$el.append(ingredientView.el);
		},

		notifyOtherIngredients: function (ingredientModel) {
			var otherIngredients = this.collection.without(ingredientModel),
				isSingle = this.model.get('isSingle');

			// if only one ingredient allowed disable others
			if (isSingle) {
				_.each(otherIngredients, function (otherIngredientModel) {
					otherIngredientModel.set('isSelected', false);
				});
			}
		}

	});

	return IngredientsView;

});