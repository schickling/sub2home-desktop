// Filename: src/js/views/store/selection/info/IngredientCategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/ingredientsSelection/IngredientsView',
	'text!templates/store/selection/info/ingredientsSelection/IngredientCategoryTemplate.html'
	], function ($, _, Backbone, IngredientsView, IngredientCategoryTemplate) {

	"use strict";

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

			var ingredientsView = new IngredientsView({
				collection: this.model.get('ingredientsCollection'),
				el: this.$('.ingredients'),
				selectionView: this.options.selectionView
			});
		}

	});

	return IngredientCategoryView;

});