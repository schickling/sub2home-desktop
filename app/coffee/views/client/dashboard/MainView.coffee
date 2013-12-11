define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "moment"
  "models/stateModel"
  "models/clientModel"
  "views/PageView"
  "views/client/dashboard/StoresView"
  "views/client/dashboard/RevenuesView"
  "text!templates/client/dashboard/MainTemplate.html"
], ($, _, Backbone, router, moment, stateModel, clientModel, PageView, StoresView, RevenuesView, MainTemplate) ->
  
  # set global moment language
  moment.lang "de",
    months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_")
    monthsShort: "Jan_Febr_Mrz_Apr_Mai_Jun_Jul_Aug_Sept_Okt_Nov_Dez".split("_")

  MainView = PageView.extend

    initialize: ->
      @model = clientModel
      
      # set page title
      @pageTitle = "Stores&Umsätze " + @model.getName() + " - sub2home"
      
      @_switchHeaderToClientView()
      @_render()

    _render: ->
      @$el.html MainTemplate
      new StoresView(
        el: @$("#clientStores .container")
        collection: @model.get("storesCollection")
      )
      new RevenuesView(
        el: @$("#clientRevenues")
        collection: @model.get("storesCollection")
      )
      @append()

    _switchHeaderToClientView: ->
      stateModel.set "isClientHeaderActive", true

