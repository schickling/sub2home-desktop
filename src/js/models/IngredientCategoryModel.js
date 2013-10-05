define(["underscore", "backbone", "collections/IngredientsCollection"], function(_, Backbone, IngredientsCollection) {
  var IngredientCategoryModel;
  return IngredientCategoryModel = Backbone.Model.extend({
    defaults: {
      ingredientsCollection: null,
      isMandatory: false,
      isSingle: false,
      title: "",
      image: "",
      icon: ""
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("ingredientsCollection")) {
        attributes.ingredientsCollection = attributes.ingredientsCollection.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      if (response.hasOwnProperty("ingredientsCollection") && response.ingredientsCollection !== null) {
        response.ingredientsCollection = new IngredientsCollection(response.ingredientsCollection);
      }
      return response;
    },
    initialize: function() {
      if (!this.get("ingredientsCollection")) {
        return this.set({
          ingredientsCollection: new IngredientsCollection()
        });
      }
    },
    isComplete: function() {
      var isComplete;
      isComplete = true;
      if (this.get("isMandatory")) {
        isComplete = false;
        this.get("ingredientsCollection").each(function(ingredientModel) {
          if (ingredientModel.get("isSelected")) {
            return isComplete = true;
          }
        });
      }
      return isComplete;
    }
  });
});
