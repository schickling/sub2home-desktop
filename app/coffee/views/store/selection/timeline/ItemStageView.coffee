define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/shared/timeline/ItemStageBaseView"
], ($, _, Backbone, ItemStageBaseView) ->

  ItemStageView = ItemStageBaseView.extend

    disabled: false
    events:
      click: "_navigate"

    initialize: ->
      self = this
      @render()
      @_update()
      @model.on "change", @_update, this
      @model.on "highlight", @_highlight, this

    _update: ->
      # locked
      @$el.toggleClass "locked", @model.get("isLocked")

      # disabled
      @$el.toggleClass "disabled", @model.get("isDisabled")

      # visited
      @$el.toggleClass "visited", @model.get("wasVisited")

    _navigate: ->
      @model.set "isActive", true  unless @model.get("isDisabled")

    _highlight: ->
      @$el.css color: "#dc952b"

