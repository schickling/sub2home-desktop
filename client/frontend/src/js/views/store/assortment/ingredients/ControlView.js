// Filename: src/js/views/store/assortment/ingredients/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView',
    'text!templates/store/assortment/ingredients/ControlTemplate.html'
    ], function ($, _, Backbone, ControlBaseView, ControlTemplate) {

	var ControlView = ControlBaseView.extend({

		template: ControlTemplate,

		events: {
			'click .bReset': '_resetAllPrices'
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

		}

	});

	return ControlView;

});