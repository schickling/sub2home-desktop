define([
	'underscore',
	'backbone',
	'models/stateModel',
	'models/DeliveryAreaModel'
	], function (_, Backbone, stateModel, DeliveryAreaModel) {

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel
		
	});

	return DeliveryAreasCollection;
});