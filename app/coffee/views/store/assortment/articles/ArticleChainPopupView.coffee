define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/assortment/articles/ArticleChainPopupTemplate.html"
], ($, _, Backbone, notificationcenter, ArticleChainPopupTemplate) ->

  ArticleChainPopupView = Backbone.View.extend

    template: _.template(ArticleChainPopupTemplate)

    events:
      "click .bClose": "_close"

    initialize: ->
      @_render()

    _render: ->
      @$el.html @template()
      @$el.fadeIn()

    _close: ->
      console.log "test"
      @$el.fadeOut()