define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  TimelineItemModel = Backbone.Model.extend

    defaults:

      # api data
      icon: ""
      image: ""
      phrase: ""

      # logic data
      isDisabled: false
      isLocked: false
      wasVisited: false
      selectionIndex: 0 # needed for info switching
      menuUpgradeSelection: false # just needed for no upgrade detection in TimelineControllerView.js


