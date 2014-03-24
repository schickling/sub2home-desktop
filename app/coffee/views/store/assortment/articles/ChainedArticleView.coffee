define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/assortment/articles/ChainedArticleTemplate.html"
], ($, _, Backbone, notificationcenter, ChainedArticleTemplate) ->

  ChainedArticleView = Backbone.View.extend

    template: _.template(ChainedArticleTemplate)

    className: "imgContainer"

    events:
      "click": "_toggle"

    initialize: ->
      @_render()
      @listenTo @model, "change", @_showState

    _render: ->
      json =
        image: @model.get "smallImage"
      @$el.html @template(json)
      @_showState()

    _showState: ->
      @$el.toggleClass "disabled", not @model.get("isActive")

    _toggle: ->
      @model.set "isActive", not @model.get("isActive")