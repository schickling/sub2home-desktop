// Filename: src/js/models/ArticleModel.js
define([
    'underscore',
    'backbone',
    'collections/MenuUpgradesCollection',
    'collections/IngredientCategoriesCollection',
    'notificationcenter'
    ], function (_, Backbone, MenuUpgradesCollection, IngredientCategoriesCollection, notificationcenter) {

	var ArticleModel = Backbone.Model.extend({

		defaults: {
			title: '',
			description: '',
			info: '',

			largeImage: '',
			smallImage: '',

			menuUpgradesCollection: null,

			ingredientCategoriesCollection: null,

			price: 0,
			total: 0,
			ingredientsTotal: 0,
			deposit: 0,

			allowsIngredients: false,
			allowsDeposit: false,
			allowsMenuUpgrades: false,

			// for assortment
			isActive: false,
			customPrice: 0,
			buyed: 0
		},

		initialize: function () {

			// wait until attributes are set
			this.on('change:ingredientCategoriesCollection', function () {
				this._listenForIngredientSelection();
			}, this);

			// needed to set total initially
			this.on('change:price', function () {
				this._calculateTotal();
			}, this);


			// throw errors
			this.on('invalid', function (model, error) {
				notificationcenter.notify('models.articleModel.invalid', {
					error: error
				});
			});

		},

		urlRoot: function () {
			return 'stores/storeAlias/articles/';
		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (this.get('menuUpgradesCollection')) {
				attributes.menuUpgradesCollection = attributes.menuUpgradesCollection.toJSON();
			}

			if (this.get('ingredientCategoriesCollection')) {
				attributes.ingredientCategoriesCollection = attributes.ingredientCategoriesCollection.toJSON();
			}

			return attributes;
		},

		parse: function (response) {

			if (response) {
				if (response.hasOwnProperty('menuUpgradesCollection') && response.menuUpgradesCollection !== null) {
					response.menuUpgradesCollection = new MenuUpgradesCollection(response.menuUpgradesCollection, {
						parse: true
					});
				}

				if (response.hasOwnProperty('ingredientCategoriesCollection') && response.ingredientCategoriesCollection !== null) {
					response.ingredientCategoriesCollection = new IngredientCategoriesCollection(response.ingredientCategoriesCollection, {
						parse: true
					});
				}

				return response;
			}

		},

		validate: function (attributes) {
			// validate numbers: price, total and ingredientsTotal
			var numbers = ['price', 'total', 'ingredientsTotal', 'deposit'];

			for (var i = 0; i < numbers.length; i++) {

				var number = numbers[i],
					value = attributes[number];

				if (typeof (value) !== 'number' || value !== parseFloat(value)) {
					return number + " has to be numeric: " + value;
				}

				if (value < 0) {
					return number + " can't be negative: " + value;
				}
			}

		},

		_listenForIngredientSelection: function () {
			// trigger change event if ingredients were selected
			var ingredientCategoriesCollection = this.get('ingredientCategoriesCollection');

			if (ingredientCategoriesCollection && this.get('allowsIngredients')) {
				_.each(ingredientCategoriesCollection.models, function (ingredientCategoryModel) {
					var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

					_.each(ingredientsCollection.models, function (ingredientModel) {
						ingredientModel.on('change:isSelected', function () {
							this._calculateTotal();
						}, this);
					}, this);

				}, this);
			}
		},

		_calculateIngredientsTotal: function () {
			var ingredientsTotal = 0,
				ingredientCategoriesCollection = this.get('ingredientCategoriesCollection');

			// sum up selected ingredients
			if (this.get('allowsIngredients') && ingredientCategoriesCollection) {

				_.each(ingredientCategoriesCollection.models, function (ingredientCategoryModel) {
					var selectedIngredientModels = ingredientCategoryModel.get('ingredientsCollection').where({
						isSelected: true
					});

					_.each(selectedIngredientModels, function (ingredientModel) {
						ingredientsTotal += ingredientModel.get('price');
					});
				});

			}

			this.set('ingredientsTotal', ingredientsTotal);

		},

		_calculateTotal: function () {
			this._calculateIngredientsTotal();

			var total = this.get('price') + this.get('ingredientsTotal');

			if (this.get('allowsDeposit')) {
				total += this.get('deposit');
			}

			this.set('total', total);
		},

		// TODO rework perhaps
		hasIngredients: function () {
			return this.get('allowsIngredients') && this.get('ingredientCategoriesCollection') !== null;
		}

	});

	return ArticleModel;

});