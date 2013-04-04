// Filename: src/js/views/store/dashboard/details/IngredientCategoryView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	var IngredientCategoryView = Backbone.View.extend({

		className: 'ingredientCategory',

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html('test');

			// this.$el.addClass();

			this._renderIngredients();
		},

		_renderIngredients: function () {
			var ingredientsCollection = null;
		}

	});

	return IngredientCategoryView;

});