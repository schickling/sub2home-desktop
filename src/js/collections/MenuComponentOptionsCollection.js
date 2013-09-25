define(["underscore", "backbone", "models/MenuComponentOptionModel"], function(_, Backbone, MenuComponentOptionModel) {
  var MenuComponentOptionsCollection;
  return MenuComponentOptionsCollection = Backbone.Collection.extend({
    model: MenuComponentOptionModel
  });
});
