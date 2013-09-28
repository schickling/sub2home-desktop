define ["jquery", "underscore", "backbone", "services/notificationcenter", "services/router", "models/cartModel", "models/ArticleModel", "models/OrderedItemModel", "views/store/home/ArticleDetailsView", "text!templates/store/home/ItemTemplate.html"], ($, _, Backbone, notificationcenter, router, cartModel, ArticleModel, OrderedItemModel, ArticleDetailsView, ItemTemplate) ->

  ItemView = Backbone.View.extend

    template: _.template(ItemTemplate)
    className: "item"

    events:
      "click .itemPreview, .itemDescription, h3": "_handleClick"

    initialize: ->
      @_render()

    _render: ->
      json =
        title: @model.get("title")
        image: @model.get("largeImage")
        description: @model.get("description")
        price: @model.get("price")
        deposit: (@model.get("deposit") or 0) * 100 # cent

      @$el.html @template(json)
      @$el.addClass @_getImageClass()

    _getImageClass: ->
      image = @model.get("largeImage")
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."))
      imageWithoutFileExtension.split("-").pop() or ""

    _handleClick: ->
      if @model.has("allowsIngredients") # article model
        if @model.get("allowsIngredients")
          if @model.get("attachedItemsCollection") # article has related article
            @_showDetails()
          else # just go to selection
            router.navigate "store/theke/artikel/" + @model.get("id"), true
        else
          @_putArticleInCart()
      else # menu bundle model
        router.navigate "store/theke/menu/" + @model.get("id"), true

    _showDetails: ->
      articleDetailsView = new ArticleDetailsView(model: @model)
      @$el.append articleDetailsView.el
      # fix alginment
      rect = @el.getBoundingClientRect()
      defaultOffset = 99
      minimumMargin = 30
      if rect.left < minimumMargin + defaultOffset
        articleDetailsView.$el.css left: minimumMargin - rect.left
      else if minimumMargin + defaultOffset > window.innerWidth - rect.right
        articleDetailsView.$el.css left: "auto", right: -(window.innerWidth - rect.right - minimumMargin)

    _putArticleInCart: ->
      orderedItemModel = new OrderedItemModel()
      orderedArticlesCollection = orderedItemModel.get("orderedArticlesCollection")
      articleModel = new ArticleModel(id: @model.get("id"))
      articleModel.fetch async: false
      orderedArticlesCollection.add articleModel: articleModel
      cartModel.addOrderedItemModel orderedItemModel
      notificationcenter.notify "views.store.home.addedOrderedItemToCart"
