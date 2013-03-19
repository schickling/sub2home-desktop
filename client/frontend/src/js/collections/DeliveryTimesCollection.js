define([
    'underscore',
    'backbone',
    'models/DeliveryTimeModel'
    ], function (_, Backbone, DeliveryTimeModel) {

	var DeliveryTimesCollection = Backbone.Collection.extend({

		model: DeliveryTimeModel

	});

	return DeliveryTimesCollection;
});