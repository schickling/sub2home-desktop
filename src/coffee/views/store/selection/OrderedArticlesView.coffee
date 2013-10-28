define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/OrderedArticleView"
], ($, _, Backbone, OrderedArticleView) ->

  OrderedArticlesView = Backbone.View.extend

    initialize: ->
      @_render()

      # listen for further ordered articles to be added
      @listenTo @collection, "add", @_renderOrderedArticle

    _render: ->
      _.each @collection.models, ((orderedArticleModel) ->
        @_renderOrderedArticle orderedArticleModel
      ), this

    _renderOrderedArticle: (orderedArticleModel) ->
      orderedArticleView = new OrderedArticleView(
        model: orderedArticleModel
        parentView: this
        el: @$el
      )

    destroy: ->
      @stopListening()

      # needed since multiplee ordered articles are listening
      @trigger "destroy"


