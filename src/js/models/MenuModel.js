define(["underscore", "backbone", "collections/MenuComponentBlocksCollection"], function(_, Backbone, MenuComponentBlocksCollection) {
  var MenuModel;
  return MenuModel = Backbone.Model.extend({
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("menuComponentBlocksCollection")) {
        attributes.menuComponentBlocksCollection = attributes.menuComponentBlocksCollection.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      if (response) {
        if (response.hasOwnProperty("menuComponentBlocksCollection") && response.menuComponentBlocksCollection !== null) {
          response.menuComponentBlocksCollection = new MenuComponentBlocksCollection(response.menuComponentBlocksCollection, {
            parse: true
          });
        }
        return response;
      }
    }
  });
});

/*
//@ sourceMappingURL=MenuModel.js.map
*/