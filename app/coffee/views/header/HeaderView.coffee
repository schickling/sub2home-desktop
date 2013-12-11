define ["jquery", "jqueryEasing", "underscore", "backbone", "services/router", "models/authentificationModel", "models/stateModel", "views/header/StoreView", "text!templates/header/HeaderTemplate.html", "text!templates/header/RoleSwitchTemplate.html"], ($, jqueryEasing, _, Backbone, router, authentificationModel, stateModel, StoreView, HeaderTemplate, RoleSwitchTemplate) ->

  HeaderView = Backbone.View.extend

    el: $("#header")

    events:
      "click #logo": "_goToHomeHome"
      "click #roleSwitch": "_switchContentView"
      "click #toTheInfo": "_goToInfo"
      "click #feedbackFlag": "_startUservoice"

    initialize: ->
      @_render()
      @_listenToHeaderState()
      @_listenToInfo()
      stateModel.on "change:storeModel", @_renderStoreView, this
      authentificationModel.on "change:isLoggedIn", @_render, this

    _render: ->
      @$el.html HeaderTemplate
      isLoggedIn = authentificationModel.isLoggedIn()
      isStoreSelected = stateModel.get("storeModel") isnt null
      isClientHeaderActive = stateModel.get("isClientHeaderActive")
      if isLoggedIn
        @_renderRoleSwitch()
        @_renderClientView()
      @_renderStoreView()  if isStoreSelected
      if isLoggedIn and isClientHeaderActive
        @_showClientView()
        @$("#headerCustomerContent").hide()
      else if isStoreSelected
        @_showStoreView()
        @$("#headerClientContent").hide()
        if !isLoggedIn
          @$el.removeClass "isLoggedIn"
        @_toggleInfoClose()

    _listenToInfo: ->
      stateModel.on "change:currentRoute", @_toggleInfoClose, this

    _toggleInfoClose: ->
      @$("#toTheInfo").toggleClass "closeTheInfo", @_isOnInfoPage()

    _listenToHeaderState: ->
      stateModel.on "change:isClientHeaderActive", (->
        if stateModel.get("isClientHeaderActive")
          @_showClientView()
        else
          @_showStoreView()
      ), this

    _renderRoleSwitch: ->
      @$el.append RoleSwitchTemplate
      @$el.addClass "isLoggedIn"

    _renderStoreView: ->
      new StoreView(
        model: stateModel.get("storeModel")
        el: @$("#headerCustomerContent")
      )

    _renderClientView: ->
      # require view when its needed
      require ["views/header/ClientView"], (ClientView) =>
        new ClientView(el: @$("#headerClientContent"))

    _showClientView: ->
      $handle = @$("#handle")
      $headerCustomerContent = @$("#headerCustomerContent")
      $headerClientContent = @$("#headerClientContent")
      $headerCustomerContent.fadeOut 100
      $headerClientContent.delay(100).fadeIn 150

      # role switch
      $handle.animate
        top: 27
      , 100, "easeInExpo", ->
        $handle.removeClass("iUser").addClass "iSettings"


    _showStoreView: ->
      $handle = @$("#handle")
      $headerCustomerContent = @$("#headerCustomerContent")
      $headerClientContent = @$("#headerClientContent")
      $headerClientContent.fadeOut 100
      $headerCustomerContent.delay(100).fadeIn 150

      # role switch
      $handle.animate
        top: 2
      , 100, "easeInExpo", ->
        $handle.removeClass("iSettings").addClass "iUser"


    _goToHomeHome: ->
      router.navigate "/", true

    _switchContentView: ->
      if stateModel.get("isClientHeaderActive") # switch to store header
        stateModel.set "isClientHeaderActive", false
        if stateModel.currentRouteIsClientRelated()
          if stateModel.currentRouteIsStoreRelated()
            router.navigate "store", true
          else
            router.navigate "/", true
      else
        stateModel.set "isClientHeaderActive", true # switch to client header
        unless stateModel.currentRouteIsClientRelated()
          if stateModel.currentRouteIsStoreRelated()
            router.navigate "store/dashboard", true
          else
            router.navigate "dashboard", true

    _isOnInfoPage: ->
      !!stateModel.get("currentRoute").match(/(store.)?info/)

    _goToInfo: (e) ->
      if @_isOnInfoPage()
        window.history.back()
      else
        if stateModel.currentRouteIsStoreRelated()
          router.navigate "store/info", true
        else
          router.navigate "info", true

    _startUservoice: ->
      UserVoice = window.UserVoice or []
      UserVoice.push ["showLightbox", "classic_widget",
        mode: "support"
        primary_color: "#cc6d00"
        link_color: "#007dbf"
      ]
