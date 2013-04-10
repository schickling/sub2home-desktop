// Filename: src/js/views/store/assortment/ingredients/IngredientView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ItemBaseView',
    'text!templates/store/assortment/ingredients/IngredientTemplate.html'
    ], function ($, _, Backbone, ItemBaseView, IngredientTemplate) {

	var IngredientView = ItemBaseView.extend({

		template: _.template(IngredientTemplate),

		className: 'ingredient'

	});

	return IngredientView;

});