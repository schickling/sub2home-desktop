define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "models/cartModel"
  "views/PageView"
  "views/store/checkout/CountdownView"
  "text!templates/store/checkout/MainTemplate.html"
], ($, _, Backbone, router, cartModel, PageView, CountdownView, MainTemplate) ->

  MainView = PageView.extend

    pageTitle: "Danke für Deine Bestellung - sub2home"
    subViews:
      countdownView: null

    initialize: ->
      if cartModel.get("isClosed")
        @render()
      else
        router.navigate "store",
          trigger: true
          replace: true

    render: ->
      @$el.html MainTemplate
      @countdownView = new CountdownView(el: @$("#checkoutNote"))
      @append()

