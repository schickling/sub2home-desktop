define [
  "jquery"
  "underscore"
  "backbone"
  "services/serverTime"
  "views/store/dashboard/revenues/RevenueView"
  "text!templates/store/dashboard/revenues/RevenuesYearTemplate.html"
], ($, _, Backbone, serverTime, RevenueView, RevenuesYearTemplate) ->

  RevenuesYearView = Backbone.View.extend

    template: _.template(RevenuesYearTemplate)
    className: "turnoverYear"

    initialize: ->
      @_render()

    _render: ->
      # check if year has passed
      currentYear = serverTime.getCurrentDate().getFullYear()
      invoiceYear = @collection.first().getTimeSpanYear()
      if invoiceYear < currentYear
        json =
          total: parseInt(@collection.getTotal(), 10)
          year: invoiceYear

        @$el.html @template(json)
      @_renderRevenues()

    _renderRevenues: ->
      _.each @collection.models, ((invoiceModel) ->
        @_renderRevenue invoiceModel
      ), this

    _renderRevenue: (invoiceModel) ->
      revenueView = new RevenueView(model: invoiceModel)

      # prepend because of inverted order
      @$el.prepend revenueView.el

