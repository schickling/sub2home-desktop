define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/tray/OrderedArticleMenuView"
  "text!templates/store/tray/OrderedMenuTemplate.html"
], ($, _, Backbone, OrderedArticleMenuView, OrderedMenuTemplate) ->

  OrderedMenuView = Backbone.View.extend

    #
    #		 * this.model: orderedItemModel
    #
    template: _.template(OrderedMenuTemplate)

    # dom
    $pricetag: null
    $controls: null
    $titleContainer: null
    events:
      mouseenter: "_showControls"
      mouseleave: "_hideControls"

    initialize: ->
      @_render()
      @_cacheDom()

    _render: ->
      @$el.addClass "orderedMenu"
      json =
        title: @model.getMenuTitle()
        total: @model.get("total") / @model.get("amount")
        amount: @model.get("amount")

      @$el.html @template(json)
      @_renderArticles()

    _renderArticles: ->
      orderedArticlesCollection = @model.get("orderedArticlesCollection")
      _.each orderedArticlesCollection.models, ((orderedArticleModel) ->
        @_renderArticle orderedArticleModel.get("articleModel")
      ), this

    _renderArticle: (articleModel) ->
      orderedArticleMenuView = new OrderedArticleMenuView(model: articleModel)
      @$(".menuItems").append orderedArticleMenuView.el

    _cacheDom: ->
      @$pricetag = @$(".pricetag")
      @$titleContainer = @$(".titleContainer")
      @$controls = @$(".controls")

    _showControls: ->
      @$pricetag.stop().animate
        right: 110
      , 200
      @$titleContainer.stop().animate
        marginRight: 210
      , 200
      @$controls.delay(100).stop().fadeIn 100

    _hideControls: ->
      @$pricetag.stop().animate
        right: 0
      , 200
      @$titleContainer.stop().animate
        marginRight: 115
      , 200
      @$controls.stop().fadeOut 100


