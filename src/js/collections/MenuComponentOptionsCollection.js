(function() {
  define(["underscore", "backbone", "models/MenuComponentOptionModel"], function(_, Backbone, MenuComponentOptionModel) {
    "use strict";
    var MenuComponentOptionsCollection;
    MenuComponentOptionsCollection = Backbone.Collection.extend({
      model: MenuComponentOptionModel
    });
    return MenuComponentOptionsCollection;
  });

}).call(this);
