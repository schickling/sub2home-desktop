define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/stateModel"
  "views/PageView"
  "views/store/dashboard/OrdersView"
  "views/store/dashboard/revenues/RevenuesView"
  "text!templates/store/dashboard/MainTemplate.html"
], ($, _, Backbone, router, stateModel, PageView, OrdersView, RevenuesView, MainTemplate) ->

  MainView = PageView.extend

    subViews:
      ordersView: null

    template: _.template(MainTemplate)
    initialize: ->

      # for authentification reload the store model
      @model = stateModel.get("storeModel")
      @model.fetch
        url: "stores/storeAlias/auth" # use custom route
        async: false


      # set page title
      @pageTitle = "Bestellungen&Umsätze " + @model.get("title") + " - sub2home"

      # check if client is allowed to view this page
      if stateModel.clientOwnsThisStore()
        @_render()
      else
        router.navigate "login",
          trigger: true
          replace: true


    _render: ->
      json = title: @model.get("title")
      @$el.html @template(json)
      @_renderOrders()

      # needs to be appended first for overscroll to work
      @append()
      @_renderRevenues()

    _renderOrders: ->
      @subViews.ordersView = new OrdersView(el: @$el)

    _renderRevenues: ->
      new RevenuesView(
        el: @$("#revenuesNote")
        collection: @model.get("invoicesCollection")
      )

