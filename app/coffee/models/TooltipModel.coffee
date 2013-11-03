define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  TooltipModel = Backbone.Model.extend

    defaults:
      className: "info"
      text: "Tooltip"


