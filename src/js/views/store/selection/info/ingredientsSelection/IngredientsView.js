// Filename: src/js/views/store/selection/info/IngredientsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/IngredientsCollection',
    'views/store/selection/info/ingredientsSelection/IngredientView'
    ], function ($, _, Backbone, IngredientsCollection, IngredientView) {

	"use strict";

	var IngredientsView = Backbone.View.extend({

		initialize: function () {

			// listen for further selection / deselection
			_.each(this.collection.models, function (ingredientModel) {

				this.listenTo(ingredientModel, 'change:isSelected', this._render);

			}, this);

			this._render();

			this._listenForDestory();

		},

		_render: function () {

			// reset view
			this.$el.html('');

			// filter active ingredients
			var activeIngredientModels = this.collection.filter(function (ingredientModel) {
				return ingredientModel.get('isSelected');
			});

			_.each(activeIngredientModels, function (ingredientModel) {
				this._renderIngredient(ingredientModel);
			}, this);

			// mark penultimate ingredient
			if (this.collection.length > 1) {
				this.$('.ingredient:last').prev().addClass('penultimate');
			}

			// mark category as "unused"
			this.$el.parent().toggleClass('unused', activeIngredientModels.length === 0);

		},

		_renderIngredient: function (ingredientModel) {
			var ingredientView = new IngredientView({
				model: ingredientModel
			});
			ingredientView.parentView = this;

			this.$el.append(ingredientView.el);
		},

		_listenForDestory: function () {
			this.options.selectionView.once('destroy', this.stopListening, this);
		}

	});

	return IngredientsView;

});