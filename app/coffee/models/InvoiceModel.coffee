define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  InvoiceModel = Backbone.Model.extend

    defaults:
      number: 0
      timeSpan: 0
      total: 0
      invoiceDocumentName: 0
      attachmentDocumentName: 0

    getTimeSpanMonth: ->
      timeSpan = @get("timeSpan")
      month = timeSpan % 12
      month = 12  if month is 0
      month

    getTimeSpanYear: ->
      timeSpan = @get("timeSpan")
      year = parseInt(timeSpan / 12, 10)
      month = timeSpan % 12
      year--  if month is 0
      year

