define([
	'underscore',
	'backbone',
	'global',
	'models/DeliveryAreaModel'
	], function (_, Backbone, global, DeliveryAreaModel) {

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel
		
	});

	return DeliveryAreasCollection;
});