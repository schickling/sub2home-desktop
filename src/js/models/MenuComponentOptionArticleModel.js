define(["underscore", "backbone"], function(_, Backbone) {
  var MenuComponentOptionArticleModel;
  return MenuComponentOptionArticleModel = Backbone.Model.extend({
    defaults: {
      title: "",
      image: "",
      description: "",
      info: "",
      isSelected: false
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionArticleModel.js.map
*/