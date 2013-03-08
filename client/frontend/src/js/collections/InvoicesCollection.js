// Filename: src/js/collections/InvoicesCollection.js
define([
    'underscore',
    'backbone',
    'models/InvoiceModel'
    ], function (_, Backbone, InvoiceModel) {

	var InvoicesCollection = Backbone.Collection.extend({

		model: InvoiceModel,

		getTotal: function () {
			var total = 0;

			_.each(this.models, function (invoiceModel) {
				total += invoiceModel.get('total');
			});

			return total;
		},

		getTotalOfCurrentYear: function () {
			var total = 0,
				currentYear = new Date().getFullYear();

			_.each(this.models, function (invoiceModel) {
				if (invoiceModel.getTimeSpanYear() === currentYear) {
					total += invoiceModel.get('total');
				}
			});

			return total;
		},

		getTotalOfCurrentMonth: function () {
			return this.last().get('total');
		},

		getTotalOfMonthWithTotalNumber: function (totalNumberOfMonths) {
			var matchingInvoiceModels = this.where({
				timeSpan: totalNumberOfMonths
			});

			if (matchingInvoiceModels.length > 0) {
				return matchingInvoiceModels[0].get('total');
			} else {
				return false;
			}
		},

		getSplittedCollectionsByYears: function () {
			var collections = {},
			yearCollection,
			year;

			_.each(this.models, function (invoiceModel) {

				year = invoiceModel.getTimeSpanYear();
				yearCollection = collections[year];

				if (yearCollection) {
					yearCollection.add(invoiceModel);
				} else {
					collections[year] = new InvoicesCollection(invoiceModel);
				}

			});

			return collections;
		}

	});

	return InvoicesCollection;
});