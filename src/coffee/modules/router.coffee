define ["require", "jquery", "underscore", "backbone", "backboneAnalytics", "notificationcenter", "models/stateModel", "models/authentificationModel"], (require, $, _, Backbone, backboneAnalytics, notificationcenter, stateModel, authentificationModel) ->

  Router = Backbone.Router.extend

    routes:
      # home
      "": "_showHomeHome"
      # info
      "info": "_showHomeInfo"
      # client
      "login": "_showClientLogin"
      "dashboard": "_showClientDashboard"
      "einstellungen": "_showClientConfig"
      # store
      ":alias": "_showStoreHome"
      ":alias/theke/:resourceType/:resourceId": "_showStoreSelection"
      ":alias/tablett": "_showStoreTray"
      ":alias/danke": "_showStoreCheckout"
      ":alias/info": "_showStoreInfo"
      ":alias/login": "_showStoreLogin"
      # store (logged in)
      ":alias/einstellungen": "_showStoreConfig"
      ":alias/sortiment": "_showStoreAssortment"
      ":alias/dashboard": "_showStoreDashboard"
      # common
      "404": "_showPageNotFound"
      "*actions": "_defaultAction"

    init: ->
      # init header
      require ["views/header/HeaderView"], (HeaderView) ->
        new HeaderView()

      # start notificationcenter
      notificationcenter.init()
      Backbone.history.start
        pushState: true
        root: "/"

    navigate: (fragment, options) ->
      parts = fragment.split("/")
      if parts[0] is "store"

        # subsitute store alias
        parts[0] = stateModel.get("storeAlias")

        # reassemble frament
        fragment = parts.join("/")
      Backbone.history.navigate fragment, options
      this

    _showHomeHome: ->
      stateModel.set currentRoute: "home.home"
      @_loadMainView "views/home/home/MainView"

    _showHomeInfo: ->
      stateModel.set currentRoute: "home.info"
      @_loadMainView "views/home/info/MainView"

    _showClientLogin: ->
      unless @_isLoggedIn()
        stateModel.set currentRoute: "client.login"
        @_loadMainView "views/client/login/MainView"
      else
        @navigate "dashboard",
          trigger: true
          replace: true

    _showClientDashboard: ->
      if @_isLoggedIn()
        stateModel.set currentRoute: "client.dashboard"
        @_loadMainView "views/client/dashboard/MainView"

    _showClientConfig: ->
      if @_isLoggedIn()
        stateModel.set currentRoute: "client.config"
        @_loadMainView "views/client/config/MainView"

    _showStoreHome: (alias) ->
      stateModel.set
        currentRoute: "store.home"
        storeAlias: alias

      @_loadMainView "views/store/home/MainView"  if @_isValidStoreModel()

    _showStoreSelection: (alias, resourceType, resourceId) ->
      stateModel.set
        currentRoute: "store.selection"
        storeAlias: alias

      params =
        selectionRessourceType: resourceType
        selectionRessourceId: resourceId

      @_loadMainView "views/store/selection/MainView", params  if @_isValidStoreModel()

    _showStoreTray: (alias) ->
      stateModel.set
        currentRoute: "store.tray"
        storeAlias: alias

      @_loadMainView "views/store/tray/MainView"  if @_isValidStoreModel()

    _showStoreCheckout: (alias) ->
      stateModel.set
        currentRoute: "store.checkout"
        storeAlias: alias

      @_loadMainView "views/store/checkout/MainView"  if @_isValidStoreModel()

    _showStoreConfig: (alias) ->
      if @_isLoggedIn()
        stateModel.set
          currentRoute: "store.config"
          storeAlias: alias

        @_loadMainView "views/store/config/MainView"  if @_isValidStoreModel()

    _showStoreAssortment: (alias) ->
      if @_isLoggedIn()
        stateModel.set
          currentRoute: "store.assortment"
          storeAlias: alias

        @_loadMainView "views/store/assortment/MainView"  if @_isValidStoreModel()

    _showStoreDashboard: (alias) ->
      if @_isLoggedIn()
        stateModel.set
          currentRoute: "store.dashboard"
          storeAlias: alias

        @_loadMainView "views/store/dashboard/MainView"  if @_isValidStoreModel()

    _showStoreInfo: (alias) ->
      stateModel.set
        currentRoute: "store.info"
        storeAlias: alias

      @_loadMainView "views/store/info/MainView"  if @_isValidStoreModel()

    _showStoreLogin: (alias) ->
      @navigate "login",
        replace: true
        trigger: true

    _showPageNotFound: ->
      stateModel.set currentRoute: "home.404"
      @_loadMainView "views/home/404/MainView"

    _loadMainView: (pathToMainView, params) ->
      self = this
      require [pathToMainView], (MainView) ->
        params = params or {}

        # destory old page view to unbind listeners
        params.currentPageView = self._pageView  if self._pageView
        self._pageView = new MainView(params)

    _defaultAction: ->
      fragment = Backbone.history.fragment

      # check for trailing slash
      if fragment.match(/.*\/$/)
        fragment = fragment.replace(/\/$/, "")
        @navigate fragment,
          trigger: true
          replace: true

      else
        @navigate "404",
          trigger: true
          replace: true

    _isLoggedIn: ->
      if authentificationModel.isLoggedIn()
        true
      else
        @navigate "login",
          trigger: true
          replace: true
        false

    _isValidStoreModel: ->
      if stateModel.doesStoreExist()
        true
      else
        @navigate "404",
          trigger: true
          replace: true
        false

  new Router()
