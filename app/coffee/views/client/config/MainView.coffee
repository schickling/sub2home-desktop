define [
  "jquery"
  "underscore"
  "backbone"
  "models/clientModel"
  "views/PageView"
  "views/client/config/ProfileView"
  "views/client/config/AddressView"
  "views/client/config/BankaccountView"
  "text!templates/client/config/MainTemplate.html"
], ($, _, Backbone, clientModel, PageView, ProfileView, AddressView, BankaccountView, MainTemplate) ->

  MainView = PageView.extend
    
    # referenced sub views
    subViews:
      profileView: null

    initialize: ->
      @model = clientModel
      
      # set page title
      @pageTitle = "Stammdaten " + @model.getName() + " - sub2home"
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_renderProfile()
      @_renderAddress()
      @_renderBankaccount()
      @append()

    _renderProfile: ->
      @subViews.profileView = new ProfileView(
        el: @$("#clientBasics")
        model: @model
      )

    _renderAddress: ->
      new AddressView(
        el: @$("#clientAddress")
        model: @model.get("addressModel")
      )

    _renderBankaccount: ->
      new BankaccountView(
        el: @$("#clientBankData")
        model: @model.get("bankaccountModel")
      )

