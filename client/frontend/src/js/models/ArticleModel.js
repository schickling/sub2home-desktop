// Filename: src/js/models/ArticleModel.js
define([
	'underscore',
	'backbone',
	'collections/MenuUpgradesCollection',
	'collections/IngredientCategoriesCollection'
	], function (_, Backbone, MenuUpgradesCollection, IngredientCategoriesCollection) {

	var ArticleModel = Backbone.Model.extend({

		idAttribute: 'cid',

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
			allowsMenuUpgrades: false
		},

		initialize: function () {

			// wait until attributes are set
			this.on('change:ingredientCategoriesCollection', function () {
				this.listenForIngredientSelection();
			}, this);

			// needed to set total initially
			this.on('change:price', function () {
				this.calculateTotal();
			}, this);


			// throw errors
			this.on('error', function (model, error) {
				console.log(error);
				throw Error(error);
			});

		},

		url: function () {
			return '/api/frontend/stores/' + window.localStorage.getItem('storeAlias') + '/articles/' + this.get('id');
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
		},

		validate: function (attributes) {
			// validate numbers: price, total and ingredientsTotal
			var numbers = ['price', 'total', 'ingredientsTotal', 'deposit'];

			for (var i = 0; i < numbers.length; i++) {

				var number = numbers[i],
					value = attributes[number];

				if (typeof (value) !== 'number' || value !== parseFloat(value)) {
					return number + " has to be numeric";
				}

				if (value < 0) {
					return number + " can't be negative";
				}
			}

		},

		listenForIngredientSelection: function () {
			// trigger change event if ingredients were selected
			var ingredientCategoriesCollection = this.get('ingredientCategoriesCollection');

			if (ingredientCategoriesCollection && this.get('allowsIngredients')) {
				ingredientCategoriesCollection.each(function (ingredientCategoryModel) {
					var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

					ingredientsCollection.each(function (ingredientModel) {
						ingredientModel.on('change:selected', function () {
							this.calculateTotal();
						}, this);
					}, this);

				}, this);
			}
		},

		calculateIngredientsTotal: function () {
			var ingredientsTotal = 0,
				ingredientCategoriesCollection = this.get('ingredientCategoriesCollection');

			// sum up selected ingredients
			if (this.get('allowsIngredients') && ingredientCategoriesCollection) {

				ingredientCategoriesCollection.each(function (ingredientCategoryModel) {
					var selectedIngredientsCollection = _(ingredientCategoryModel.get('ingredientsCollection').where({
						selected: true
					}));

					selectedIngredientsCollection.each(function (ingredientModel) {
						ingredientsTotal += ingredientModel.get('price');
					});
				});

			}

			this.set('ingredientsTotal', ingredientsTotal);

		},

		calculateTotal: function () {
			this.calculateIngredientsTotal();

			var total = this.get('price') + this.get('ingredientsTotal');

			if (this.get('allowsDeposit')) {
				total += this.get('deposit');
			}

			this.set('total', total);
		}

	});

	return ArticleModel;

});