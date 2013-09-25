define(["underscore", "backbone", "models/MenuComponentBlockModel"], function(_, Backbone, MenuComponentBlockModel) {
  var MenuComponentBlocksCollection;
  return MenuComponentBlocksCollection = Backbone.Collection.extend({
    model: MenuComponentBlockModel
  });
});
