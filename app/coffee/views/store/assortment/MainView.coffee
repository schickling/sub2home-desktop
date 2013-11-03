define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/stateModel"
  "views/PageView"
  "views/store/assortment/SectionsNavigationView"
  "views/store/assortment/articles/CategoriesView"
  "views/store/assortment/menuUpgrades/MenuUpgradesView"
  "views/store/assortment/menuBundles/MenuBundlesView"
  "views/store/assortment/ingredients/IngredientCategoriesView"
  "text!templates/store/assortment/MainTemplate.html"
], ($, _, Backbone, router, stateModel, PageView, SectionsNavigationView, CategoriesView, MenuUpgradesView, MenuBundlesView, IngredientCategoriesView, MainTemplate) ->

  MainView = PageView.extend

    subViews:
      categoriesView: null
      ingredientCategoriesView: null
      menuUpgradesView: null
      menuBundlesView: null

    initialize: ->
      # for authentification reload the store model
      @model = stateModel.get("storeModel")
      @model.fetch
        url: "stores/storeAlias/auth" # use custom route
        async: false

      # set page title
      @pageTitle = "Sortimentverwaltung " + @model.get("title") + " - sub2home"

      # check if client is allowed to view this page
      if stateModel.clientOwnsThisStore()
        @_render()
      else
        router.navigate "login",
          trigger: true
          replace: true

    _render: ->
      @$el.html MainTemplate

      # render navigation
      @_renderSectionsNavigation()

      # render slides
      @_renderArticleSection()
      @_renderMenuUpgradesSection()
      @_renderMenuBundlesSection()
      @_renderIngredientsSection()
      @append()

    _renderSectionsNavigation: ->
      new SectionsNavigationView(el: @$el)

    _renderArticleSection: ->
      @subViews.categoriesView = new CategoriesView(el: @$el)

    _renderMenuUpgradesSection: ->
      @subViews.menuUpgradesView = new MenuUpgradesView(el: @$el)

    _renderMenuBundlesSection: ->
      @subViews.menuBundlesView = new MenuBundlesView(el: @$el)

    _renderIngredientsSection: ->
      @subViews.ingredientCategoriesView = new IngredientCategoriesView(el: @$el)

