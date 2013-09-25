define ["underscore", "backbone", "models/TimelineItemModel"], (_, Backbone, TimelineItemModel) ->

  TimelineItemsCollection = Backbone.Collection.extend(model: TimelineItemModel)
  TimelineItemsCollection