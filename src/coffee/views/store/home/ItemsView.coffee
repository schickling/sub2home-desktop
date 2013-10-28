define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/home/ItemView"
], ($, _, Backbone, ItemView) ->

  ItemsView = Backbone.View.extend

    initialize: ->
      @collection.groupItems()
      @render()

    render: ->
      _.each @collection.models, ((itemModel) ->
        @renderItem itemModel  unless itemModel.get("isAttached")
      ), this

    renderItem: (itemModel) ->
      itemView = new ItemView(model: itemModel)
      @$el.append itemView.el

