// Filename: src/js/views/store/dashboard/details/IngredientCategoryView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/details/IngredientCategoryTemplate.html'
    ], function ($, _, Backbone, IngredientCategoryTemplate) {

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

		_renderIngredients: function () {
			var ingredientsCollection = this.model.get('ingredientsCollection'),
				$ingredients = this.$('.ingredients');

			_.each(ingredientsCollection.models, function (ingredientModel) {
				$ingredients.append('<span>' + ingredientModel.get('shortcut') + '</span>');
			});
		}

	});

	return IngredientCategoryView;

});