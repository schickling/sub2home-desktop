define([
	'jquery',
	'underscore',
	'backbone',
	'global',
	'models/DeliveryTimeModel'
	], function ($, _, Backbone, global, DeliveryTimeModel) {

	var DeliveryTimesCollection = Backbone.Collection.extend({

		model: DeliveryTimeModel
		
	});

	return DeliveryTimesCollection;
});