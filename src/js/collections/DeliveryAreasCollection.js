define([
    'underscore',
    'backbone',
    'models/DeliveryAreaModel'
    ], function (_, Backbone, DeliveryAreaModel) {

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel

	});

	return DeliveryAreasCollection;
});