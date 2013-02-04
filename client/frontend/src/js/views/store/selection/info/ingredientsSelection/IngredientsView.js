// Filename: src/js/views/store/selection/info/IngredientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/IngredientsCollection',
	'views/store/selection/info/ingredientsSelection/IngredientView'
	], function ($, _, Backbone, IngredientsCollection, IngredientView) {

	var IngredientsView = Backbone.View.extend({

		initialize: function () {

			// listen for further selection / deselection
			_.each(this.collection.models, function (ingredientModel) {

				ingredientModel.on('change:isSelected', this.render, this);

			}, this);

			this.render();

		},

		render: function () {

			// reset view
			this.$el.html('');

			// filter active ingredients
			var activeIngredients = this.collection.where({
				isSelected: true
			});

			_.each(activeIngredients, function (ingredientModel) {
				this.renderIngredient(ingredientModel);
			}, this);

			// mark penultimate ingredient
			if (this.collection.length > 1) {
				this.$('.ingredient:last').prev().addClass('penultimate');
			}
		},

		renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});

			this.$el.append(ingredientView.el);
		}

	});

	return IngredientsView;

});