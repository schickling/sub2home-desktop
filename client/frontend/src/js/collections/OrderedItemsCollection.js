// Filename: src/js/collections/OrderedItemsCollection.js
define([
	'require',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/OrderedItemModel'
	], function (require, _, Backbone, backboneLocalStorage, OrderedItemModel) {


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