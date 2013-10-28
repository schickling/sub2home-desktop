define(["underscore", "backbone"], function(_, Backbone) {
  var TimelineItemModel;
  return TimelineItemModel = Backbone.Model.extend({
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
});

/*
//@ sourceMappingURL=TimelineItemModel.js.map
*/