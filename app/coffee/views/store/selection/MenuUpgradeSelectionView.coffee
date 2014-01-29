define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/menuUpgradeSelection/InfoView"
  "views/store/selection/SelectionView"
  "views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView"
], ($, _, Backbone, InfoView, SelectionView, MenuUpgradesView) ->

  MenuUpgradeSelectionView = SelectionView.extend

    stageViewClass: MenuUpgradesView
    infoViewClass: InfoView

    _prepare: ->
      articleModel = @model.get("articleModel")
      if @model.isMenuUpgradeBase() and articleModel.get("allowsMenuUpgrades")
        menuUpgradesCollection = articleModel.get("menuUpgradesCollection")
        if menuUpgradesCollection and menuUpgradesCollection.length > 0
          @active = true
          @timelineItemsCollection.add
            phrase: "Mach's zum Menü"
            menuUpgradeSelection: true
            icon: "iMenuUpgrade"
            image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menuupgrade.png"

          @_listenForSelection()

    _listenForSelection: ->
      baseOrderedArticleModel = @model

      # listen for new menu upgrade selection
      @listenTo baseOrderedArticleModel, "change:menuUpgradeModel", ->
        @_selectMenuUpgrade baseOrderedArticleModel.get("menuUpgradeModel")  if baseOrderedArticleModel.get("menuUpgradeModel")


    _selectMenuUpgrade: (menuUpgradeModel) ->
      orderedArticlesCollection = @model.collection
      orderedItemModel = @model.get("orderedItemModel")
      menuComponentBlocksCollection = menuUpgradeModel.get("menuComponentBlocksCollection")

      # remove ordered articles belonging to an old menu upgrade
      orderedItemModel.reduceOrderedArticles()

      # create new ordered articles for each menu component block
      _.each menuComponentBlocksCollection.models, (menuComponentBlockModel) ->
        orderedArticlesCollection.add
          menuComponentBlockModel: menuComponentBlockModel
          orderedItemModel: orderedItemModel
          menuUpgradeModel: menuUpgradeModel


