define(["underscore", "backbone"], function(_, Backbone) {
  "use strict";
  var TooltipModel;
  TooltipModel = Backbone.Model.extend({
    defaults: {
      className: "info",
      text: "Tooltip"
    }
  });
  return TooltipModel;
});

/*
//@ sourceMappingURL=TooltipModel.js.map
*/