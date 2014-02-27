define [
  "underscore"
  "backbone"
  "services/serverTime"
  "models/InvoiceModel"
], (_, Backbone, serverTime, InvoiceModel) ->

  InvoicesCollection = Backbone.Collection.extend

    model: InvoiceModel

    comparator: (invoiceModel) ->
      invoiceModel.get "timeSpan"

    getTotal: ->
      total = 0
      _.each @models, (invoiceModel) ->
        total += invoiceModel.get("total")

      total

    getTotalOfCurrentYear: ->
      total = 0
      currentYear = serverTime.getCurrentDate().getFullYear()
      _.each @models, (invoiceModel) ->
        total += invoiceModel.get("total")  if invoiceModel.getTimeSpanYear() is currentYear

      total

    getTotalOfCurrentMonth: ->
      @last().get "total"

    getTotalOfMonthWithTotalNumber: (totalNumberOfMonths) ->
      matchingInvoiceModels = @where(timeSpan: totalNumberOfMonths)
      if matchingInvoiceModels.length > 0
        matchingInvoiceModels[0].get "total"
      else
        false

    getSplittedCollectionsByYears: ->
      collections = {}
      _.each @models, (invoiceModel) ->
        year = invoiceModel.getTimeSpanYear()
        yearCollection = collections[year]
        if yearCollection
          yearCollection.add invoiceModel
        else
          collections[year] = new InvoicesCollection(invoiceModel)

      collections
