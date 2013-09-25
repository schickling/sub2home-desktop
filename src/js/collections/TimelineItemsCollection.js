define(["underscore", "backbone", "models/TimelineItemModel"], function(_, Backbone, TimelineItemModel) {
  var TimelineItemsColleciton;
  return TimelineItemsColleciton = Backbone.Collection.extend({
    model: TimelineItemModel
  });
});
