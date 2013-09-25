(function() {
  define(["underscore", "backbone", "models/MenuComponentBlockModel"], function(_, Backbone, MenuComponentBlockModel) {
    var MenuComponentBlocksCollection;
    MenuComponentBlocksCollection = Backbone.Collection.extend({
      model: MenuComponentBlockModel
    });
    return MenuComponentBlocksCollection;
  });

}).call(this);
