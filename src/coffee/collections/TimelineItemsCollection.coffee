define ["underscore", "backbone", "models/TimelineItemModel"], (_, Backbone, TimelineItemModel) ->

  TimelineItemsColleciton = Backbone.Collection.extend

    model: TimelineItemModel