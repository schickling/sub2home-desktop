define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "services/helpers"
  "services/notificationcenter"
  "models/stateModel"
  "models/clientModel"
  "models/authentificationModel"
  "text!templates/header/ClientTemplate.html"
], ($, _, Backbone, router, helpers, notificationcenter, stateModel, clientModel, authentificationModel, ClientTemplate) ->

  ClientView = Backbone.View.extend

    template: _.template ClientTemplate

    # cached dom
    $buttonLogout: null
    $buttonClientDashboard: null
    $buttonClientConfig: null
    $buttonStoreDashboard: null
    $buttonStoreAssortment: null
    $buttonStoreConfig: null
    $allButtons: null
    $currentIcon: null
    $title: null
    animationTime: 150

    events:
      "click #bSignout": "_logout"
      "click #bStoreConfig": "_navigateToStoreConfig"
      "click #bClientConfig": "_navigateToClientConfig"
      "click #bStoreAssortment": "_navigateToStoreAssortment"
      "click #bStoreDashboard": "_navigateToStoreDashboard"
      "click #bClientDashboard": "_navigateToClientDashboard"

    initialize: ->
      @_render()
      @_enableTooltips()
      @_listenToCurrentRoute()
      @_listenToNumberOfUndoneOrders()

    _render: ->
      storeModel = stateModel.get("storeModel")
      numberOfUndoneOrders = storeModel.get("numberOfUndoneOrders")
      json = numberOfUndoneOrders: numberOfUndoneOrders
      @$el.html @template(json)
      @_cacheDom()
      @$buttonStoreDashboard.toggleClass "unseenContent", numberOfUndoneOrders > 0
      @_selectViewFromCurrentRoute()

    _enableTooltips: ->
      notificationcenter.tooltip @$("#bSignout")
      notificationcenter.tooltip @$("#bStoreConfig")
      notificationcenter.tooltip @$("#bClientConfig")
      notificationcenter.tooltip @$("#bStoreAssortment")
      notificationcenter.tooltip @$("#bStoreDashboard")
      notificationcenter.tooltip @$("#bClientDashboard")

    _cacheDom: ->
      @$buttonLogout = @$("#bSignout")
      @$buttonClientDashboard = @$("#bClientDashboard")
      @$buttonClientConfig = @$("#bClientConfig")
      @$buttonStoreDashboard = @$("#bStoreDashboard")
      @$buttonStoreAssortment = @$("#bStoreAssortment")
      @$buttonStoreConfig = @$("#bStoreConfig")
      @$allButtons = @$("#clientAreaNavigation .iBtn").not(@$buttonLogout)
      @$currentIcon = @$("#currentIcon")
      @$title = @$("#currentInfo span")

    _listenToCurrentRoute: ->
      stateModel.on "change:currentRoute", @_selectViewFromCurrentRoute, this

    _listenToNumberOfUndoneOrders: ->
      storeModel = stateModel.get("storeModel")
      storeModel.on "change:numberOfUndoneOrders", @_adjustNumberOfUndoneOrders, this

    _selectViewFromCurrentRoute: ->
      currentRoute = stateModel.get("currentRoute")
      switch currentRoute
        when "client.dashboard"
          @_showClientDashboard()
        when "client.config"
          @_showClientConfig()
        when "store.dashboard"
          @_showStoreDashboard()
        when "store.assortment"
          @_showStoreAssortment()
        when "store.config"
          @_showStoreConfig()
        else
          @_showStoreGlobal()  if stateModel.doesStoreExist()

    _showClientDashboard: ->
      $neededButtons = @$buttonClientConfig
      $unneededButtons = @$allButtons.not($neededButtons)
      title = clientModel.getName() + "'s sub2home"
      @$allButtons.removeClass "active"
      @$title.text title
      @$currentIcon.removeClass "storeIcon"
      @$currentIcon.addClass "clientIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _showClientConfig: ->
      $neededButtons = @$buttonClientDashboard
      console.log $neededButtons
      $unneededButtons = @$allButtons.not($neededButtons)
      title = clientModel.getName() + "'s sub2home"
      @$allButtons.removeClass "active"
      @$title.text title
      @$currentIcon.removeClass "storeIcon"
      @$currentIcon.addClass "clientIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _showStoreDashboard: ->
      $neededButtons = $.makeObjectOfArray([@$buttonClientDashboard, @$buttonStoreConfig, @$buttonStoreAssortment, @$buttonStoreDashboard])
      $unneededButtons = @$allButtons.not($neededButtons)
      storeModel = stateModel.get("storeModel")
      title = "Dashboard: " + storeModel.get("title")
      @$allButtons.removeClass "active"
      @$buttonStoreDashboard.addClass "active"
      @$title.text title
      @$currentIcon.removeClass "clientIcon"
      @$currentIcon.addClass "storeIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _showStoreAssortment: ->
      $neededButtons = $.makeObjectOfArray([@$buttonClientDashboard, @$buttonStoreConfig, @$buttonStoreAssortment, @$buttonStoreDashboard])
      $unneededButtons = @$allButtons.not($neededButtons)
      storeModel = stateModel.get("storeModel")
      title = "Sortiment: " + storeModel.get("title")
      @$allButtons.removeClass "active"
      @$buttonStoreAssortment.addClass "active"
      @$title.text title
      @$currentIcon.removeClass "clientIcon"
      @$currentIcon.addClass "storeIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _showStoreConfig: ->
      $neededButtons = $.makeObjectOfArray([@$buttonClientDashboard, @$buttonStoreConfig, @$buttonStoreAssortment, @$buttonStoreDashboard])
      $unneededButtons = @$allButtons.not($neededButtons)
      storeModel = stateModel.get("storeModel")
      title = "Einstellungen: " + storeModel.get("title")
      @$allButtons.removeClass "active"
      @$buttonStoreConfig.addClass "active"
      @$title.text title
      @$currentIcon.removeClass "clientIcon"
      @$currentIcon.addClass "storeIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _showStoreGlobal: ->
      $neededButtons = $.makeObjectOfArray([@$buttonClientDashboard, @$buttonStoreConfig, @$buttonStoreAssortment, @$buttonStoreDashboard])
      $unneededButtons = @$allButtons.not($neededButtons)
      storeModel = stateModel.get("storeModel")
      title = storeModel.get("title")
      @$allButtons.removeClass "active"
      @$title.text title
      @$currentIcon.removeClass "clientIcon"
      @$currentIcon.addClass "storeIcon"
      $unneededButtons.fadeOut @animationTime
      $neededButtons.delay(@animationTime + 10).fadeIn @animationTime + 50

    _logout: ->
      logoutSucceded = authentificationModel.logout()
      router.navigate "/", true  if logoutSucceded and stateModel.currentRouteIsClientRelated()

    _navigateToStoreConfig: ->
      router.navigate "store/einstellungen", true

    _navigateToStoreAssortment: ->
      router.navigate "store/sortiment", true

    _navigateToStoreDashboard: ->
      router.navigate "store/dashboard", true

    _navigateToClientDashboard: ->
      router.navigate "dashboard", true

    _navigateToClientConfig: ->
      router.navigate "einstellungen", true

    _adjustNumberOfUndoneOrders: ->
      storeModel = stateModel.get("storeModel")
      @$(".numberOfUndoneOrders").text storeModel.get("numberOfUndoneOrders")

    remove: ->
      stateModel.off "change:currentRoute", @_selectViewFromCurrentRoute, this
