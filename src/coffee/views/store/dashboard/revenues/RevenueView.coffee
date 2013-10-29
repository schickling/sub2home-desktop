define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "services/notificationcenter"
  "text!templates/store/dashboard/revenues/RevenueTemplate.html"
], ($, _, Backbone, moment, notificationcenter, RevenueTemplate) ->

  RevenueView = Backbone.View.extend

    template: _.template(RevenueTemplate)

    events:
      "click i": "_download"

    className: "turnover"
    isValidMonth: false
    $download: null

    initialize: ->
      @_validateMonth()
      @_render()
      @_enableTooltips()
      @_cacheDom()

    _render: ->
      invoiceMoment = moment([ # - 1 because moment counts month from 0
        @model.getTimeSpanYear()
        @model.getTimeSpanMonth() - 1
      ])
      documentsPath = "https://s3-eu-west-1.amazonaws.com/sub2home-data/documents/invoices/"
      json =
        total: parseInt(@model.get("total"), 10)
        month: invoiceMoment.format("MMM")
        year: invoiceMoment.format("YYYY")
        invoiceUrl: documentsPath + @model.get("invoiceDocumentName")
        attachmentUrl: documentsPath + @model.get("attachmentDocumentName")

      @$el.html @template(json)

    _enableTooltips: ->
      notificationcenter.tooltip @$(".bInvoiceCoin")
      notificationcenter.tooltip @$(".bInvoiceList")

    _cacheDom: ->
      @$download = @$("i")

    _validateMonth: ->
      now = new Date()
      currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1
      @isValidMonth = (@model.get("timeSpan") isnt currentTotalNumberOfMonths)


