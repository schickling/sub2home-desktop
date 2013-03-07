// Filename: src/js/collections/OrderedItemsCollection.js
define([
	'underscore',
	'backbone',
	'models/OrderedItemModel'
	], function (_, Backbone, OrderedItemModel) {


	var OrderedItemsCollection = Backbone.Collection.extend({

		model: OrderedItemModel,

		getTotal: function() {
			var total = 0;

			this.each(function(orderedItemModel) {
				total += orderedItemModel.get('total');
			});

			return total;
		}

	});

	return OrderedItemsCollection;

});