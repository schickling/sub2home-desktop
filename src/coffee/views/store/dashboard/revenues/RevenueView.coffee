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
      "mouseenter i": "_showTooltip"
      "mouseleave i": "_hideTooltip"
      "mouseenter .bInvoiceCoin": "_tooltipForInvoice"
      "mouseenter .bInvoiceList": "_tooltipForAttachment"
      "mouseleave .iBtn": "_dismissTooltip"

    className: "turnover"
    isValidMonth: false
    $download: null

    initialize: ->
      @_validateMonth()
      @_render()
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

    _cacheDom: ->
      @$download = @$("i")

    _validateMonth: ->
      now = new Date()
      currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1
      @isValidMonth = (@model.get("timeSpan") isnt currentTotalNumberOfMonths)

    _showTooltip: ->
      if @isValidMonth
        offset = @$download.offset()
        notificationcenter.tooltip "views.store.dashboard.invoice.download", offset.top + 24, offset.left + 14

    _hideTooltip: ->
      notificationcenter.hideTooltip()  if @isValidMonth

    _tooltipForInvoice: ->
      offset = @$(".bInvoiceCoin").offset()
      notificationcenter.tooltip "views.store.dashboard.invoice.invoice", offset.top + 24, offset.left + 15

    _tooltipForAttachment: ->
      offset = @$(".bInvoiceList").offset()
      notificationcenter.tooltip "views.store.dashboard.invoice.attachment", offset.top + 24, offset.left + 15

    _dismissTooltip: ->
      notificationcenter.hideTooltip()


