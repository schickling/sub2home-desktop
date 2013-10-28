define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/stage/menuUpgradeSelection/MenuComponentBlockView"
  "text!templates/store/selection/stage/menuUpgradeSelection/MenuUpgradeTemplate.html"
], ($, _, Backbone, MenuComponentBlockView, MenuUpgradeTemplate) ->

  MenuUpgradeView = Backbone.View.extend

    $menuComponentBlocks: null

    className: "menuUpgrade"

    template: _.template(MenuUpgradeTemplate)

    events:
      click: "_select"

    initialize: ->
      @orderedArticleModel = @options.orderedArticleModel
      @_render()

    _render: ->
      baseArticleModel = @orderedArticleModel.get("articleModel")
      json =
        title: @model.get("title")
        price: @model.get("price")
        description: @model.get("description")
        baseArticleImage: baseArticleModel.get("largeImage")

      @$el.html @template(json)
      @_checkSelected()
      @_cacheDom()
      @_renderMenuComponentBlocks()

    _checkSelected: ->
      menuUpgradeModel = @orderedArticleModel.get("menuUpgradeModel")
      @$el.addClass "selected"  if menuUpgradeModel and menuUpgradeModel.get("id") is @model.get("id")

    _cacheDom: ->
      @$menuComponentBlocks = @$(".menuComponentBlocks")

    _renderMenuComponentBlocks: ->
      menuComponentBlocksCollection = @model.get("menuComponentBlocksCollection")
      _.each menuComponentBlocksCollection.models, ((menuComponentBlockModel) ->
        @_renderMenuComponentBlock menuComponentBlockModel
      ), this

    _renderMenuComponentBlock: (menuComponentBlockModel) ->
      menuComponentBlockView = new MenuComponentBlockView(model: menuComponentBlockModel)
      @$menuComponentBlocks.append menuComponentBlockView.el

    _select: ->
      
      # mark current menu upgrade as selected
      @$el.addClass "selected"
      
      # unmark other menu upgrades
      @$el.siblings().removeClass "selected"
      @orderedArticleModel.set "menuUpgradeModel", @model
      @$el.trigger "fetched"

