// Filename: src/js/views/store/assortment/ingredients/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView'
    ], function ($, _, Backbone, ControlBaseView) {

	var ControlView = ControlBaseView.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllIngredients'
		},

		_countItems: function () {
			var numberOfItems = 0;

			_.each(this.collection.models, function (ingredientCategoryModel) {
				numberOfItems += ingredientCategoryModel.get('ingredientsCollection').length;
			});

			this.numberOfItems = numberOfItems;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

				_.each(ingredientsCollection.models, function (ingredient) {

					// check if price reset is needed
					if (ingredient.get('price') !== ingredient.get('customPrice')) {
						this._updateModel(ingredient, {
							customPrice: ingredient.get('price')
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

		},

		_showAllIngredients: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

				_.each(ingredientsCollection.models, function (ingredientModel) {

					// check if activation needed
					if (!ingredientModel.get('isActive')) {
						this._updateModel(ingredientModel, {
							isActive: true
						});
					}

				}, this);
			}, this);

			this._updateLoadBar();

		}

	});

	return ControlView;

});