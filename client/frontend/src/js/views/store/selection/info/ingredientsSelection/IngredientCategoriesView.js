// Filename: src/js/views/store/selection/info/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/ingredientsSelection/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	var IngredientCategoriesView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.renderIngredientCategory(item);
			}, this);
		},

		renderIngredientCategory: function (item) {
			var ingredientCategoryView = new IngredientCategoryView({
				model: item
			});

			var $item = ingredientCategoryView.render().$el;

			this.$el.append($item);
		}

	});

	return IngredientCategoriesView;

});