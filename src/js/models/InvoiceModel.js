// Filename: src/js/models/InvoiceModel.js
define([
    'underscore',
    'backbone'
    ], function (_, Backbone) {

	var InvoiceModel = Backbone.Model.extend({

		defaults: {
			number: 0,
			timeSpan: 0,
			total: 0,
			invoiceDocumentName: 0,
			attachmentDocumentName: 0
		},

		getTimeSpanMonth: function () {
			var timeSpan = this.get('timeSpan'),
				month = timeSpan % 12;

			if (month === 0) {
				month = 12;
			}

			return month;
		},

		getTimeSpanYear: function () {
			var timeSpan = this.get('timeSpan'),
				year = parseInt(timeSpan / 12, 10),
				month = timeSpan % 12;

			if (month === 0) {
				year--;
			}

			return year;
		}

	});

	return InvoiceModel;

});