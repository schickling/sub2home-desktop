define(["underscore", "backbone", "collections/MenuUpgradesCollection", "collections/IngredientCategoriesCollection", "notificationcenter"], function(_, Backbone, MenuUpgradesCollection, IngredientCategoriesCollection, notificationcenter) {
  var ArticleModel;
  return ArticleModel = Backbone.Model.extend({
    defaults: {
      title: "",
      description: "",
      info: "",
      largeImage: "",
      smallImage: "",
      menuUpgradesCollection: null,
      ingredientCategoriesCollection: null,
      price: 0,
      total: 0,
      ingredientsTotal: 0,
      deposit: 0,
      allowsIngredients: false,
      allowsDeposit: false,
      allowsMenuUpgrades: false,
      isActive: false,
      customPrice: 0,
      buyed: 0
    },
    urlRoot: "stores/storeAlias/articles/",
    initialize: function() {
      this.on("change:ingredientCategoriesCollection", (function() {
        return this._listenForIngredientSelection();
      }), this);
      this.on("change:price", (function() {
        return this._calculateTotal();
      }), this);
      return this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.articleModel.invalid", {
          error: error
        });
      });
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("menuUpgradesCollection")) {
        attributes.menuUpgradesCollection = attributes.menuUpgradesCollection.toJSON();
      }
      if (this.get("ingredientCategoriesCollection")) {
        attributes.ingredientCategoriesCollection = attributes.ingredientCategoriesCollection.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      if (response) {
        if (response.hasOwnProperty("menuUpgradesCollection") && response.menuUpgradesCollection !== null) {
          response.menuUpgradesCollection = new MenuUpgradesCollection(response.menuUpgradesCollection, {
            parse: true
          });
        }
        if (response.hasOwnProperty("ingredientCategoriesCollection") && response.ingredientCategoriesCollection !== null) {
          response.ingredientCategoriesCollection = new IngredientCategoriesCollection(response.ingredientCategoriesCollection, {
            parse: true
          });
        }
        return response;
      }
    },
    validate: function(attributes) {
      var i, number, numbers, value;
      numbers = ["price", "total", "ingredientsTotal", "deposit"];
      i = 0;
      while (i < numbers.length) {
        number = numbers[i];
        value = attributes[number];
        if (typeof value !== "number" || value !== parseFloat(value)) {
          return number + " has to be numeric: " + value;
        }
        if (value < 0) {
          return number + " can't be negative: " + value;
        }
        i++;
      }
    },
    _listenForIngredientSelection: function() {
      var ingredientCategoriesCollection;
      ingredientCategoriesCollection = this.get("ingredientCategoriesCollection");
      if (ingredientCategoriesCollection && this.get("allowsIngredients")) {
        return _.each(ingredientCategoriesCollection.models, (function(ingredientCategoryModel) {
          var ingredientsCollection;
          ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection");
          return _.each(ingredientsCollection.models, (function(ingredientModel) {
            return ingredientModel.on("change:isSelected", (function() {
              return this._calculateTotal();
            }), this);
          }), this);
        }), this);
      }
    },
    _calculateIngredientsTotal: function() {
      var ingredientCategoriesCollection, ingredientsTotal;
      ingredientsTotal = 0;
      ingredientCategoriesCollection = this.get("ingredientCategoriesCollection");
      if (this.get("allowsIngredients") && ingredientCategoriesCollection) {
        _.each(ingredientCategoriesCollection.models, function(ingredientCategoryModel) {
          var selectedIngredientModels;
          selectedIngredientModels = ingredientCategoryModel.get("ingredientsCollection").where({
            isSelected: true
          });
          return _.each(selectedIngredientModels, function(ingredientModel) {
            return ingredientsTotal += ingredientModel.get("price");
          });
        });
      }
      return this.set("ingredientsTotal", ingredientsTotal);
    },
    _calculateTotal: function() {
      var total;
      this._calculateIngredientsTotal();
      total = this.get("price") + this.get("ingredientsTotal");
      if (this.get("allowsDeposit")) {
        total += this.get("deposit");
      }
      return this.set("total", total);
    },
    hasIngredients: function() {
      return this.get("allowsIngredients") && this.get("ingredientCategoriesCollection") !== null;
    }
  });
});
