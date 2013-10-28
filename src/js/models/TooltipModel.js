define(["underscore", "backbone"], function(_, Backbone) {
  var TooltipModel;
  return TooltipModel = Backbone.Model.extend({
    defaults: {
      className: "info",
      text: "Tooltip"
    }
  });
});

/*
//@ sourceMappingURL=TooltipModel.js.map
*/