define [
  "underscore"
  "backbone"
  "models/MenuBundleModel"
  "models/MenuUpgradeModel"
  "collections/TimelineItemsCollection"
  "collections/OrderedArticlesCollection"
], (_, Backbone, MenuBundleModel, MenuUpgradeModel, TimelineItemsCollection, OrderedArticlesCollection) ->

  OrderedItemModel = Backbone.Model.extend

    defaults:

      # needed to be overwritten by unique id
      id: 0
      amount: 1
      total: 0
      menuBundleModel: null
      orderedArticlesCollection: null

      # gathers all timeline items of all ordered articles in right order
      # gets filled in each selection view
      timelineItemsCollection: null
      isInCart: false

    initialize: ->

      # generate unique id
      if @get("id") is 0
        @set
          id: _.uniqueId()
        ,
          silent: true

      @set "orderedArticlesCollection", new OrderedArticlesCollection()  unless @get("orderedArticlesCollection")
      @set "timelineItemsCollection", new TimelineItemsCollection()  unless @get("timelineItemsCollection")

      # listeners for total price calculation
      @_initializeListeners()

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.orderedArticlesCollection = attributes.orderedArticlesCollection.toJSON()  if @get("orderedArticlesCollection")
      attributes.menuBundleModel = attributes.menuBundleModel.toJSON()  if @get("menuBundleModel")
      delete attributes.timelineItemsCollection

      attributes

    # copied to orderedItemCollection because of cyclic dependencies
    parse: (response) ->
      if response.hasOwnProperty("orderedArticlesCollection")
        response.orderedArticlesCollection = new OrderedArticlesCollection response.orderedArticlesCollection, parse: true

        # set back reference
        _.each response.orderedArticlesCollection.models, (orderedArticleModel) =>
          orderedArticleModel.set
            orderedItemModel: this
          ,
            silent: true

      if response.hasOwnProperty("menuBundleModel") and response.menuBundleModel
        response.menuBundleModel = new MenuBundleModel response.menuBundleModel, parse: true

      if response.hasOwnProperty("menuUpgradeModel") and response.menuUpgradeModel
        menuUpgradeModel = new MenuUpgradeModel response.menuUpgradeModel, parse: true
        response.orderedArticlesCollection.at(0).set "menuUpgradeModel", menuUpgradeModel

      response

    # needed if an ordered items gets deleted from cart
    destroy: ->
      @collection.remove this

    isMenuBundle: ->
      @get("menuBundleModel") isnt null

    isMenu: ->
      @isMenuBundle() or @get("orderedArticlesCollection").first().hasBeenUpgraded()

    # remove ordered articles belonging to an old menu upgrade
    reduceOrderedArticles: ->
      orderedArticlesCollection = @get("orderedArticlesCollection")
      i = 0

      # i syntax needed because of removing while iterating
      while i < orderedArticlesCollection.length
        orderedArticleModel = orderedArticlesCollection.models[i]
        unless orderedArticleModel.isMenuUpgradeBase()
          orderedArticleModel.destroy()
          i--
        i++

      @_calculateTotal()

    getMenuTitle: ->
      if @isMenuBundle()
        menuBundleModel = @get("menuBundleModel")
        menuBundleModel.get "title"
      else
        firstOrderedArticleModel = @get("orderedArticlesCollection").first()
        menuUpgradeModel = firstOrderedArticleModel.get("menuUpgradeModel")
        menuUpgradeModel.get "title"

    isEditable: ->
      return true  if @isMenu()
      orderedArticleModel = @get("orderedArticlesCollection").first()
      articleModel = orderedArticleModel.get("articleModel")
      articleModel.get "allowsIngredients"

    canBeUpgraded: ->
      @get("orderedArticlesCollection").first().isMenuUpgradeBase()

    _initializeListeners: ->
      @_listenToAmount()

      # bind all ordered articles wheather their price has changed
      orderedArticlesCollection = @get("orderedArticlesCollection")
      _.each orderedArticlesCollection.models, ((orderedArticleModel) ->
        @_addOrderedArticleListener orderedArticleModel
      ), this

      # bind listeners in future
      orderedArticlesCollection.on "add", ((orderedArticleModel) ->
        @_addOrderedArticleListener orderedArticleModel
      ), this
      orderedArticlesCollection.on "remove", (orderedArticleModel) ->
        orderedArticleModel.off "priceChanged"

      @on "recalculate", @_calculateTotal, this

    _listenToAmount: ->
      @on "change:amount", @_calculateTotal, this

    _addOrderedArticleListener: (orderedArticleModel) ->
      orderedArticleModel.on "priceChanged", @_calculateTotal, this

    _calculateTotal: ->
      total = 0
      orderedArticlesCollection = @get("orderedArticlesCollection")

      # calculate total for menu bundle
      if @isMenuBundle()
        menuBundleModel = @get("menuBundleModel")
        total = menuBundleModel.get("price")
        _.each orderedArticlesCollection.models, (orderedArticleModel) ->
          articleModel = orderedArticleModel.get("articleModel")
          if articleModel
            total += articleModel.get("ingredientsTotal")
            total += articleModel.get("deposit")

      else
        baseOrderedArticleModel = orderedArticlesCollection.first()
        baseArticleModel = baseOrderedArticleModel.get("articleModel")

        # calculate total of base article
        total = baseArticleModel.get("total")

        # calculate total for menu upgrade
        if baseOrderedArticleModel.hasBeenUpgraded()
          menuUpgradeOrderedArticleModels = orderedArticlesCollection.without(baseOrderedArticleModel)
          menuUpgradeModel = baseOrderedArticleModel.get("menuUpgradeModel")
          total += menuUpgradeModel.get("price")
          _.each menuUpgradeOrderedArticleModels, (menuUpgradeOrderedArticleModel) ->
            menuUpgradeArticleModel = menuUpgradeOrderedArticleModel.get("articleModel")

            # "if" needed here
            if menuUpgradeArticleModel
              total += menuUpgradeArticleModel.get("ingredientsTotal")
              total += menuUpgradeArticleModel.get("deposit")

      @set "total", total * @get("amount")

    isEditable: ->
      return true  if @isMenu()
      orderedArticleModel = @get("orderedArticlesCollection").first()
      articleModel = orderedArticleModel.get("articleModel")
      articleModel.get "allowsIngredients"

    canBeUpgraded: ->
      @get("orderedArticlesCollection").first().isMenuUpgradeBase()

    isComplete: ->
      isComplete = true
      @get('orderedArticlesCollection').each (orderedArticleModel) ->
        isComplete = false  unless orderedArticleModel.isComplete()
      isComplete
