define(["underscore", "backbone", "models/MenuComponentBlockMediaModel", "collections/MenuComponentOptionsCollection"], function(_, Backbone, MenuComponentBlockMediaModel, MenuComponentOptionsCollection) {
  var MenuComponentBlockModel;
  return MenuComponentBlockModel = Backbone.Model.extend({
    defaults: {
      menuComponentOptionsCollection: null
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("menuComponentOptionsCollection")) {
        attributes.menuComponentOptionsCollection = attributes.menuComponentOptionsCollection.toJSON();
      }
      if (this.get("menuComponentBlockMediaModel")) {
        attributes.menuComponentBlockMediaModel = attributes.menuComponentBlockMediaModel.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      if (response.hasOwnProperty("menuComponentOptionsCollection") && response.menuComponentOptionsCollection !== null) {
        response.menuComponentOptionsCollection = new MenuComponentOptionsCollection(response.menuComponentOptionsCollection, {
          parse: true
        });
      }
      if (response.hasOwnProperty("menuComponentBlockMediaModel") && response.menuComponentBlockMediaModel !== null) {
        response.menuComponentBlockMediaModel = new MenuComponentBlockMediaModel(response.menuComponentBlockMediaModel);
      }
      return response;
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentBlockModel.js.map
*/