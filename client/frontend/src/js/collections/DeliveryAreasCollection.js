define([
    'underscore',
    'backbone',
    'global',
    'models/DeliveryAreaModel'
    ], function (_, Backbone, global, DeliveryAreaModel) {

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/deliveryareas';
		}

	});

	return DeliveryAreasCollection;
});