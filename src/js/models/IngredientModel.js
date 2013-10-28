define(["underscore", "backbone"], function(_, Backbone) {
  var IngredientModel;
  return IngredientModel = Backbone.Model.extend({
    defaults: {
      title: "",
      shortTitle: "",
      shortcut: "",
      description: "",
      largeImage: "default",
      icon: "",
      isSelected: false,
      price: 0,
      isActive: false,
      customPrice: 0,
      buyed: 0
    },
    urlRoot: "stores/storeAlias/ingredients/"
  });
});

/*
//@ sourceMappingURL=IngredientModel.js.map
*/