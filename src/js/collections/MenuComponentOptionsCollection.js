(function() {
  define(["underscore", "backbone", "models/MenuComponentOptionModel"], function(_, Backbone, MenuComponentOptionModel) {
    var MenuComponentOptionsCollection;
    MenuComponentOptionsCollection = Backbone.Collection.extend({
      model: MenuComponentOptionModel
    });
    return MenuComponentOptionsCollection;
  });

}).call(this);
