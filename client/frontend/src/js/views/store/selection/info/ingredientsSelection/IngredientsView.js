// Filename: src/js/views/store/selection/info/IngredientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/IngredientsCollection',
	'views/store/selection/info/ingredientsSelection/IngredientView'
	], function ($, _, Backbone, IngredientsCollection, IngredientView) {

	var IngredientsView = Backbone.View.extend({

		activeIngredientsCollection: null,

		initialize: function () {

			this.activeIngredientsCollection = new IngredientsCollection();

			this.collection.each(function (ingredientModel) {

				// add already selected to active collection
				if (ingredientModel.get('selected')) {
					this.activeIngredientsCollection.add(ingredientModel);
				}

				// listen for further selection / deselection
				ingredientModel.bind('change:selected', function () {
					if (ingredientModel.get('selected')) {
						this.activeIngredientsCollection.add(ingredientModel);
					} else {
						this.activeIngredientsCollection.remove(ingredientModel);
					}
				}, this);


			}, this);

			this.render();

			// bind collection events
			this.activeIngredientsCollection.bind('add remove', this.render, this);

		},

		render: function () {

			// clean old ingredient views
			this.$el.empty();

			this.activeIngredientsCollection.each(function (ingredientModel) {
				this.renderIngredient(ingredientModel);
			}, this);
		},

		renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});

			var $item = ingredientView.render().$el;

			this.$el.append($item);
		}

	});

	return IngredientsView;

});