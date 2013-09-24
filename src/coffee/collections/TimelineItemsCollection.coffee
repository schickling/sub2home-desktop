define ["underscore", "backbone", "models/TimelineItemModel"], (_, Backbone, TimelineItemModel) ->
  "use strict"
  TimelineItemsCollection = Backbone.Collection.extend(model: TimelineItemModel)
  TimelineItemsCollection