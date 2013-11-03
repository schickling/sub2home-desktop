define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "text!templates/client/dashboard/RevenueTemplate.html"
], ($, _, Backbone, moment, RevenueTemplate) ->

  RevenueView = Backbone.View.extend

    template: _.template(RevenueTemplate)

    className: "clientMonthlyTurnover"
      
    initialize: ->
      @_render()

    _render: ->
      invoiceMoment = moment([ # - 1 because moment counts month from 0
        @model.getTimeSpanYear()
        @model.getTimeSpanMonth() - 1
      ])
      json =
        total: parseInt(@model.get("total"), 10)
        month: invoiceMoment.format("MMM")
        year: invoiceMoment.format("YYYY")

      @$el.html @template(json)

