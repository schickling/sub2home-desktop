define(["jquery", "underscore", "backbone", "moment", "models/InvoiceModel", "views/client/dashboard/RevenueView", "text!templates/client/dashboard/RevenuesTemplate.html"], function($, _, Backbone, moment, InvoiceModel, RevenueView, RevenuesTemplate) {
  var RevenuesView;
  return RevenuesView = Backbone.View.extend({
    template: _.template(RevenuesTemplate),
    $clientRecentMonthlyRevenues: null,
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var currentMoment, json;
      currentMoment = moment();
      json = {
        totalOfCurrentYear: parseInt(this._getTotalOfCurrentYear(), 10),
        totalOfCurrentMonth: parseInt(this._getTotalOfCurrentMonth(), 10),
        currentMonth: currentMoment.format("MMMM"),
        currentYear: currentMoment.format("YYYY"),
        currentYearShort: currentMoment.format("YY")
      };
      this.$el.html(this.template(json));
      this._cacheDom();
      return this._renderRevenues();
    },
    _cacheDom: function() {
      return this.$clientRecentMonthlyRevenues = this.$("#clientRecentMonthlyRevenues");
    },
    _renderRevenues: function() {
      var invoiceModels;
      invoiceModels = this._getSummedUpInvoiceModels();
      return _.each(invoiceModels, (function(invoiceModel) {
        return this._renderRevenue(invoiceModel);
      }), this);
    },
    _renderRevenue: function(invoiceModel) {
      var revenueView;
      revenueView = new RevenueView({
        model: invoiceModel
      });
      return this.$clientRecentMonthlyRevenues.append(revenueView.el);
    },
    _getTotalOfCurrentYear: function() {
      var invoicesCollection, totalOfCurrentYear;
      totalOfCurrentYear = 0;
      invoicesCollection = void 0;
      _.each(this.collection.models, function(storeModel) {
        invoicesCollection = storeModel.get("invoicesCollection");
        return totalOfCurrentYear += invoicesCollection.getTotalOfCurrentYear();
      });
      return totalOfCurrentYear;
    },
    _getTotalOfCurrentMonth: function() {
      var invoicesCollection, totalOfCurrentMonth;
      totalOfCurrentMonth = 0;
      invoicesCollection = void 0;
      _.each(this.collection.models, function(storeModel) {
        invoicesCollection = storeModel.get("invoicesCollection");
        return totalOfCurrentMonth += invoicesCollection.getTotalOfCurrentMonth();
      });
      return totalOfCurrentMonth;
    },
    _getSummedUpInvoiceModels: function() {
      var currentTotalNumberOfMonths, i, invoiceModel, invoiceModels, invoicesCollection, now, total, totalNumberOfMonths;
      invoiceModels = [];
      now = new Date();
      currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1;
      invoiceModel = void 0;
      totalNumberOfMonths = void 0;
      total = void 0;
      invoicesCollection = void 0;
      i = void 0;
      _.each(this.collection.models, (function(storeModel) {
        var _results;
        totalNumberOfMonths = currentTotalNumberOfMonths;
        i = 0;
        _results = [];
        while (true) {
          invoicesCollection = storeModel.get("invoicesCollection");
          total = invoicesCollection.getTotalOfMonthWithTotalNumber(totalNumberOfMonths);
          if (total === false) {
            break;
          }
          invoiceModel = invoiceModels[i];
          if (invoiceModel) {
            invoiceModel.set("total", invoiceModel.get("total") + total);
          } else {
            invoiceModels[i] = new InvoiceModel({
              total: total,
              timeSpan: totalNumberOfMonths
            });
          }
          totalNumberOfMonths--;
          _results.push(i++);
        }
        return _results;
      }), this);
      return invoiceModels;
    }
  });
});

/*
//@ sourceMappingURL=RevenuesView.js.map
*/