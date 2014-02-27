define [
  "jquery"
  "underscore"
  "backbone"
  "moment"
  "services/serverTime"
  "models/InvoiceModel"
  "views/client/dashboard/RevenueView"
  "text!templates/client/dashboard/RevenuesTemplate.html"
], ($, _, Backbone, moment, serverTime, InvoiceModel, RevenueView, RevenuesTemplate) ->

  RevenuesView = Backbone.View.extend

    template: _.template(RevenuesTemplate)

    $clientRecentMonthlyRevenues: null

    initialize: ->
      @_render()

    _render: ->
      currentMoment = moment()
      json =
        totalOfCurrentYear: parseInt(@_getTotalOfCurrentYear(), 10)
        totalOfCurrentMonth: parseInt(@_getTotalOfCurrentMonth(), 10)
        currentMonth: currentMoment.format("MMMM")
        currentYear: currentMoment.format("YYYY")
        currentYearShort: currentMoment.format("YY")

      @$el.html @template(json)
      @_cacheDom()
      @_renderRevenues()

    _cacheDom: ->
      @$clientRecentMonthlyRevenues = @$("#clientRecentMonthlyRevenues")

    _renderRevenues: ->
      invoiceModels = @_getSummedUpInvoiceModels()
      now = serverTime.getCurrentDate()
      currentTimeSpan = now.getMonth() + 1 + now.getFullYear() * 12
      _.each invoiceModels, (invoiceModel) ->
        if invoiceModel.get("timeSpan") isnt currentTimeSpan
          @_renderRevenue invoiceModel
      , this

    _renderRevenue: (invoiceModel) ->
      revenueView = new RevenueView(model: invoiceModel)
      @$clientRecentMonthlyRevenues.append revenueView.el

    _getTotalOfCurrentYear: ->
      totalOfCurrentYear = 0
      invoicesCollection = undefined
      _.each @collection.models, (storeModel) ->
        invoicesCollection = storeModel.get("invoicesCollection")
        totalOfCurrentYear += invoicesCollection.getTotalOfCurrentYear()

      totalOfCurrentYear

    _getTotalOfCurrentMonth: ->
      totalOfCurrentMonth = 0
      invoicesCollection = undefined
      _.each @collection.models, (storeModel) ->
        invoicesCollection = storeModel.get("invoicesCollection")
        totalOfCurrentMonth += invoicesCollection.getTotalOfCurrentMonth()

      totalOfCurrentMonth

    _getSummedUpInvoiceModels: ->
      invoiceModels = []
      now = serverTime.getCurrentDate()
      currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1 # +1 since in js month numbers start with 0
      invoiceModel = undefined
      totalNumberOfMonths = undefined
      total = undefined
      invoicesCollection = undefined
      i = undefined
      _.each @collection.models, ((storeModel) ->
        totalNumberOfMonths = currentTotalNumberOfMonths
        i = 0
        loop
          invoicesCollection = storeModel.get("invoicesCollection")
          total = invoicesCollection.getTotalOfMonthWithTotalNumber(totalNumberOfMonths)
          break  if total is false
          invoiceModel = invoiceModels[i]
          if invoiceModel
            invoiceModel.set "total", invoiceModel.get("total") + total
          else
            invoiceModels[i] = new InvoiceModel(
              total: total
              timeSpan: totalNumberOfMonths
            )
          totalNumberOfMonths--
          i++
      ), this
      invoiceModels

