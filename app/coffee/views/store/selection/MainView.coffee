define [
  "jquery"
  "jqueryOverscroll"
  "underscore"
  "backbone"
  "models/cartModel"
  "models/ArticleModel"
  "models/MenuBundleModel"
  "models/OrderedItemModel"
  "models/OrderedArticleModel"
  "collections/OrderedArticlesCollection"
  "collections/TimelineItemsCollection"
  "views/PageView"
  "views/store/selection/TimelineControllerView"
  "views/store/selection/OrderedArticlesView"
  "views/store/selection/timeline/CartTimelineView"
  "text!templates/store/selection/MainTemplate.html"
], ($, jqueryOverscroll, _, Backbone, cartModel, ArticleModel, MenuBundleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, CartTimelineView, MainTemplate) ->

  MainView = PageView.extend

    orderedItemModel: null

    events:
      "mouseenter #timelineNote .container": "_slideTimelineUp"
      "mouseleave #timelineNote .container": "_slideTimelineDown"

    # referenced sub views
    subViews:
      timelineControllerView: null
      orderedArticlesView: null


    # cached dom
    $timelineNote: null
    $timelineContainerWrapper: null
    $overlay: null
    initialize: ->
      selectionRessourceType = @options.selectionRessourceType

      # load ordered item and render
      if selectionRessourceType is "artikel"
        @_createOrderedItemFromArticle()
      else if selectionRessourceType is "menu"
        @_createOrderedItemFromMenuBundle()
      else
        @_loadOrderedItemFromLocalStorage()

    _createOrderedItemFromArticle: ->
      self = this

      # fetch article from server
      articleModel = new ArticleModel(id: @options.selectionRessourceId)
      articleModel.fetch
        success: ->

          # check if has ingredients or menu upgrades
          if not articleModel.get("ingredientCategoriesCollection") and not articleModel.get("menuUpgradesCollection")
            self.pageNotFound()
            return

          # create new ordered article
          orderedArticleModel = new OrderedArticleModel()
          self.orderedItemModel = new OrderedItemModel(orderedArticlesCollection: new OrderedArticlesCollection(orderedArticleModel))

          # append ordered item to ordered article
          orderedArticleModel.set
            articleModel: articleModel
            orderedItemModel: self.orderedItemModel


          # set page title
          self.pageTitle = "Beleg dein " + articleModel.get("title") + " - sub2home"
          self._render()

        error: ->
          self.pageNotFound()


    _createOrderedItemFromMenuBundle: ->
      self = this

      # fetch menuBundleModel from server
      menuBundleModel = new MenuBundleModel(id: @options.selectionRessourceId)
      menuBundleModel.fetch
        success: ->
          menuComponentBlocksCollection = menuBundleModel.get("menuComponentBlocksCollection")
          orderedArticlesCollection = new OrderedArticlesCollection()
          self.orderedItemModel = new OrderedItemModel(
            orderedArticlesCollection: orderedArticlesCollection
            menuBundleModel: menuBundleModel
          )

          # create new ordered article for each menu component block
          _.each menuComponentBlocksCollection.models, (menuComponentBlockModel) ->
            orderedArticleModel = new OrderedArticleModel(
              menuComponentBlockModel: menuComponentBlockModel
              orderedItemModel: self.orderedItemModel
            )
            orderedArticlesCollection.add orderedArticleModel


          # set page title
          self.pageTitle = "Vervollständige dein " + menuBundleModel.get("title") + " - sub2home"
          self._render()

        error: ->
          self.pageNotFound()


    _loadOrderedItemFromLocalStorage: ->

      # fetch from localStorage
      orderedItemsCollection = cartModel.getOrderedItemsCollection()
      @orderedItemModel = orderedItemsCollection.get(@options.selectionRessourceId)
      if @orderedItemModel

        # set page title
        @pageTitle = "Nochmal ändern - sub2home"
        @_render()
      else
        @pageNotFound()

    _render: ->

      # render template
      @$el.html MainTemplate
      @_cacheDom()

      # append to body
      @append()

      # add cart timeline item
      @_renderCartTimelineItem()

      # render ordered articles
      @_renderOrderedArticles()

      # initalize TimelineControllerView
      @_initializeTimelineController()
      @_initOverscroll()

    _cacheDom: ->
      @$timelineNote = @$("#timelineNote")
      @$timelineContainerWrapper = @$timelineNote.find("#timelineContainerWrapper")
      @$overlay = @$("#overlay")

    _initOverscroll: ->

      # initialize overscroll
      @$timelineContainerWrapper.overscroll
        showThumbs: false
        direction: "horizontal"
        wheelDirection: "horizontal"
        ignoreSizing: true


    _renderCartTimelineItem: ->
      timelineItemsCollection = new TimelineItemsCollection(
        isDisabled: true
        icon: "iCart"
      )
      new CartTimelineView(
        collection: timelineItemsCollection
        el: @$timelineNote
      )

    _renderOrderedArticles: ->
      @subViews.orderedArticlesView = new OrderedArticlesView(
        collection: @orderedItemModel.get("orderedArticlesCollection")
        el: @$el
      )

    _initializeTimelineController: ->
      @subViews.timelineControllerView = new TimelineControllerView(
        model: @orderedItemModel
        collection: @orderedItemModel.get("timelineItemsCollection")
        el: @$el
      )

    _slideTimelineUp: ->
      @$timelineNote.stop().animate
        bottom: 0
      , 300

    _slideTimelineDown: ->
      @$timelineNote.stop().animate
        bottom: -50
      , 300

