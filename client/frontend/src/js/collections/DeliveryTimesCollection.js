define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'models/DeliveryTimeModel'
	], function ($, _, Backbone, stateModel, DeliveryTimeModel) {

	var DeliveryTimesCollection = Backbone.Collection.extend({

		model: DeliveryTimeModel
		
	});

	return DeliveryTimesCollection;
});