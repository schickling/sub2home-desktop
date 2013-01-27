define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'models/DeliveryTimeModel'
	], function ($, _, Backbone, stateModel, DeliveryTimeModel) {

	var DeliveryTimesCollection = Backbone.Collection.extend({

		model: DeliveryTimeModel,

		url: function () {
			return '/api/frontend/stores/' + stateModel.get('storeAlias') + '/deliverytimes';
		}
	});

	return DeliveryTimesCollection;
});