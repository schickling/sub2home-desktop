(function() {
  define(["underscore", "backbone", "models/TimelineItemModel"], function(_, Backbone, TimelineItemModel) {
    var TimelineItemsCollection;
    TimelineItemsCollection = Backbone.Collection.extend({
      model: TimelineItemModel
    });
    return TimelineItemsCollection;
  });

}).call(this);
