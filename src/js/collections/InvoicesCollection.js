(function() {
  define(["underscore", "backbone", "models/InvoiceModel"], function(_, Backbone, InvoiceModel) {
    "use strict";
    var InvoicesCollection;
    InvoicesCollection = Backbone.Collection.extend({
      model: InvoiceModel,
      comparator: function(invoiceModel) {
        return invoiceModel.get("timeSpan");
      },
      getTotal: function() {
        var total;
        total = 0;
        _.each(this.models, function(invoiceModel) {
          return total += invoiceModel.get("total");
        });
        return total;
      },
      getTotalOfCurrentYear: function() {
        var currentYear, total;
        total = 0;
        currentYear = new Date().getFullYear();
        _.each(this.models, function(invoiceModel) {
          if (invoiceModel.getTimeSpanYear() === currentYear) {
            return total += invoiceModel.get("total");
          }
        });
        return total;
      },
      getTotalOfCurrentMonth: function() {
        return this.last().get("total");
      },
      getTotalOfMonthWithTotalNumber: function(totalNumberOfMonths) {
        var matchingInvoiceModels;
        matchingInvoiceModels = this.where({
          timeSpan: totalNumberOfMonths
        });
        if (matchingInvoiceModels.length > 0) {
          return matchingInvoiceModels[0].get("total");
        } else {
          return false;
        }
      },
      getSplittedCollectionsByYears: function() {
        var collections, year, yearCollection;
        collections = {};
        yearCollection = void 0;
        year = void 0;
        _.each(this.models, function(invoiceModel) {
          year = invoiceModel.getTimeSpanYear();
          yearCollection = collections[year];
          if (yearCollection) {
            return yearCollection.add(invoiceModel);
          } else {
            return collections[year] = new InvoicesCollection(invoiceModel);
          }
        });
        return collections;
      }
    });
    return InvoicesCollection;
  });

}).call(this);
