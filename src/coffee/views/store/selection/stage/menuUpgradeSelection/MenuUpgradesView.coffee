define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/stage/SlideView"
  "views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView"
  "views/store/selection/stage/menuUpgradeSelection/NoUpgradeView"
], ($, _, Backbone, SlideView, MenuUpgradeView, NoUpgradeView) ->

  MenuUpgradesView = SlideView.extend
    
    #
    #		 * this.model: orderedArticleModel
    #		 
    $menuUpgradesContainer: null
    afterInitialize: ->
      
      # add class
      @$el.addClass "menuUpgrades"
      articleModel = @model.get("articleModel")
      @collection = articleModel.get("menuUpgradesCollection")
      @_renderNoUpgradeView()
      @_renderMenuUpgrades()

    
    # needs to be overwritten because of no upgrade
    adjustWidth: ->
      @$el.width window.innerWidth - 301
      @_centerVertically()

    _renderMenuUpgrades: ->
      @$menuUpgradesContainer = $("<div class=\"menuUpgradesContainer\">")
      @$el.append @$menuUpgradesContainer
      _.each @collection.models, ((menuUpgradeModel) ->
        @_renderMenuUpgrade menuUpgradeModel
      ), this

    _renderMenuUpgrade: (menuUpgradeModel) ->
      menuUpgradeView = new MenuUpgradeView(
        model: menuUpgradeModel
        orderedArticleModel: @model
      )
      @$menuUpgradesContainer.append menuUpgradeView.el

    _renderNoUpgradeView: ->
      noUpgradeView = new NoUpgradeView(model: @model)
      @$el.append noUpgradeView.el

    _centerVertically: ->
      $menuUpgradesContainer = @$(".menuUpgradesContainer")
      slideHeight = @$el.height()
      menuUpgradesHeight = $menuUpgradesContainer.height()
      marginTop = (slideHeight - menuUpgradesHeight) / 2
      $menuUpgradesContainer.css marginTop: marginTop

