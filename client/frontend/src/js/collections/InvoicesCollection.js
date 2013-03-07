// Filename: src/js/collections/InvoicesCollection.js
define([
	'underscore',
	'backbone',
	'models/InvoiceModel'
	], function (_, Backbone, InvoiceModel) {

	var InvoicesCollection = Backbone.Collection.extend({

		model: InvoiceModel,

		getTotal: function() {
			var total = 0;

			_.each(this.models, function(invoiceModel) {
				total += invoiceModel.get('total');
			});

			return total;
		}

	});

	return InvoicesCollection;
});