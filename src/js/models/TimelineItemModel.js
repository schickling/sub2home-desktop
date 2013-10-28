define(["underscore", "backbone"], function(_, Backbone) {
  "use strict";
  var TimelineItemModel;
  TimelineItemModel = Backbone.Model.extend({
    defaults: {
      icon: "",
      image: "",
      phrase: "",
      isDisabled: false,
      isLocked: false,
      wasVisited: false,
      selectionIndex: 0,
      menuUpgradeSelection: false
    }
  });
  return TimelineItemModel;
});

/*
//@ sourceMappingURL=TimelineItemModel.js.map
*/