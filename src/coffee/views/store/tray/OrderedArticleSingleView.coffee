define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/tray/OrderedArticleSingleTemplate.html"
], ($, _, Backbone, OrderedArticleSingleTemplate) ->

  OrderedArticleSingleView = Backbone.View.extend

    template: _.template(OrderedArticleSingleTemplate)

    events:
      mouseenter: "_showControls"
      mouseleave: "_hideControls"

    # dom
    $pricetag: null
    $controls: null

    initialize: ->
      @_render()
      @_cacheDom()

    _render: ->
      orderedArticleModel = @model.get("orderedArticlesCollection").first()
      articleModel = orderedArticleModel.get("articleModel")
      json =
        title: articleModel.get("title")
        image: articleModel.get("largeImage")
        info: articleModel.get("info")
        total: @model.get("total") / @model.get("amount")
        amount: @model.get("amount")
        description: @_getDescription()

      @$el.html @template(json)
      @$el.addClass "orderedArticle"

    _cacheDom: ->
      @$pricetag = @$(".pricetag")
      @$controls = @$(".controls")

    _showControls: ->
      @$pricetag.stop().animate
        right: 110
      , 200
      @$controls.delay(100).stop().fadeIn 100

    _hideControls: ->
      @$pricetag.stop().animate
        right: 15
      , 200
      @$controls.stop().fadeOut 100

    _getDescription: ->
      orderedArticleModel = @model.get("orderedArticlesCollection").first()
      articleModel = orderedArticleModel.get("articleModel")
      description = articleModel.get("description")
      if articleModel.hasIngredients()
        ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection")
        ingredientModels = ingredientCategoriesCollection.getAllSelectedIngredientModels()
        i = 0

        while i < ingredientModels.length
          ingredientTitle = ingredientModels[i].get("shortTitle")
          if i > 0

            # if penulitmate ingredient
            if i is ingredientModels.length - 1
              description += " und " + ingredientTitle
            else
              description += ", " + ingredientTitle
          else
            description = ingredientTitle
          i++
      description


