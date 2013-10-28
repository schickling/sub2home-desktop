define(["underscore", "backbone"], function(_, Backbone) {
  var InvoiceModel;
  return InvoiceModel = Backbone.Model.extend({
    defaults: {
      number: 0,
      timeSpan: 0,
      total: 0,
      invoiceDocumentName: 0,
      attachmentDocumentName: 0
    },
    getTimeSpanMonth: function() {
      var month, timeSpan;
      timeSpan = this.get("timeSpan");
      month = timeSpan % 12;
      if (month === 0) {
        month = 12;
      }
      return month;
    },
    getTimeSpanYear: function() {
      var month, timeSpan, year;
      timeSpan = this.get("timeSpan");
      year = parseInt(timeSpan / 12, 10);
      month = timeSpan % 12;
      if (month === 0) {
        year--;
      }
      return year;
    }
  });
});

/*
//@ sourceMappingURL=InvoiceModel.js.map
*/