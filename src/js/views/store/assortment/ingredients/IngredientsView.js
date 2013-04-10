// Filename: src/js/views/store/assortment/ingredients/IngredientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/ingredients/IngredientView'
	], function ($, _, Backbone, IngredientView) {

	var IngredientsView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (ingredientModel) {
				this._renderIngredient(ingredientModel);
			}, this);
		},

		_renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});

			this.$el.append(ingredientView.el);
		}

	});

	return IngredientsView;

});