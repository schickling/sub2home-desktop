define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "services/router"
  "text!templates/client/dashboard/StoreTemplate.html"
], ($, _, Backbone, moment, router, StoreTemplate) ->

  StoreView = Backbone.View.extend

    template: _.template(StoreTemplate)

    className: "clientStore"

    events:
      click: "_navigate"

    initialize: ->
      @_render()

    _render: ->
      invoicesCollection = @model.get("invoicesCollection")
      currentMoment = moment()
      json =
        title: @model.get("title")
        month: currentMoment.format("MMMM")
        year: currentMoment.format("YYYY")
        total: parseInt(invoicesCollection.getTotalOfCurrentMonth(), 10)
        numberOfUndoneOrders: @model.get("numberOfUndoneOrders")

      @$el.html @template(json)

    _navigate: ->
      router.navigate @model.get("alias") + "/dashboard", true

