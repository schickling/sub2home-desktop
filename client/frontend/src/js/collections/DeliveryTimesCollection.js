define([
    'underscore',
    'backbone',
    'global',
    'models/DeliveryTimeModel'
    ], function (_, Backbone, global, DeliveryTimeModel) {

	var DeliveryTimesCollection = Backbone.Collection.extend({

		model: DeliveryTimeModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/deliverytimes';
		}

	});

	return DeliveryTimesCollection;
});