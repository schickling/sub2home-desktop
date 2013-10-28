define(["underscore", "backbone"], function(_, Backbone) {
  var ItemModel;
  return ItemModel = Backbone.Model.extend({
    idAttribute: "cid",
    defaults: {
      attachedItemsCollection: null,
      isAttached: false
    }
  });
});

/*
//@ sourceMappingURL=ItemModel.js.map
*/