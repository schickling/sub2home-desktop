define ["jquery", "underscore", "backbone", "services/router", "models/stateModel", "text!templates/store/home/ArticleDetailsTemplate.html"], ($, _, Backbone, router, stateModel, ArticleDetailsTemplate) ->

  ArticleDetailsView = Backbone.View.extend

    className: "detailsArticle"
    selectedItemModel: null
    animationTime: 200
    hideTimer: 0
    template: _.template(ArticleDetailsTemplate)

    events:
      "click .bFood, img": "_goToSelection"
      "click .footlongOption": "_makeFootlong"
      "click .uncheckFootlong": "_make6Inch"
      "mouseleave": "_hide"
      "mouseenter": "_stopHiding"

    initialize: ->
      @selectedItemModel = @model
      @_render()

    _render: ->
      chainedArticlesCollection = @model.get("chainedArticlesCollection")
      footlongItemModel = chainedArticlesCollection.first()
      json =
        title: @model.get("title")
        image: @model.get("largeImage")
        footlongImage: footlongItemModel.get("largeImage")
        description: @model.get("description")
        price: @model.get("price")
      @$el.html @template(json)

    _goToSelection: ->
      router.navigate "store/theke/artikel/" + @selectedItemModel.get("id"), true

    _makeFootlong: ->
      chainedArticlesCollection = @model.get("chainedArticlesCollection")
      footlongItemModel = chainedArticlesCollection.first()
      $uncheckFootlong = @$(".uncheckFootlong")
      $footlongOption = @$(".footlongOption")
      $images = @$("img")
      $6inch = $images.eq(0)
      $footlong = $images.eq(1)
      $pricetag = @$(".pricetag")
      $footlong.fadeIn @animationTime
      $6inch.delay(@animationTime / 2).fadeOut @animationTime / 2
      $uncheckFootlong.fadeIn @animationTime
      $footlongOption.fadeOut @animationTime
      $pricetag.find("span").text footlongItemModel.get("price") + " €"
      $pricetag.animate
        left: 393
      , @animationTime
      @selectedItemModel = footlongItemModel

    _make6Inch: ->
      $uncheckFootlong = @$(".uncheckFootlong")
      $footlongOption = @$(".footlongOption")
      $images = @$("img")
      $6inch = $images.eq(0)
      $footlong = $images.eq(1)
      $pricetag = @$(".pricetag")
      $footlong.fadeOut @animationTime
      $6inch.fadeIn @animationTime / 2
      $uncheckFootlong.fadeOut @animationTime
      $footlongOption.fadeIn @animationTime
      $pricetag.find("span").text @model.get("price") + " €"
      $pricetag.animate
        left: 193
      , @animationTime
      @selectedItemModel = @model

    _hide: ->
      self = this
      @hideTimer = setTimeout(->
        self.$el.fadeOut 150, ->
          self.remove()
      , 200)

    _stopHiding: ->
      clearTimeout @hideTimer
