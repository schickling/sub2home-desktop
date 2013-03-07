// Filename: src/js/collections/InvoicesCollection.js
define([
	'underscore',
	'backbone',
	'models/InvoiceModel'
	], function (_, Backbone, InvoiceModel) {

	var InvoicesCollection = Backbone.Collection.extend({

		model: InvoiceModel,

		getTotalOfCurrentYear: function() {
			var total = 0,
				currentYear = new Date().getFullYear();

			_.each(this.models, function(invoiceModel) {
				if (invoiceModel.getTimeSpanYear() === currentYear) {
					total += invoiceModel.get('total');
				}
			});

			return total;
		},

		getTotalOfCurrentMonth: function() {
			return this.last().get('total');
		}

	});

	return InvoicesCollection;
});