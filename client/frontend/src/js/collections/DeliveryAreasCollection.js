define([
	'underscore',
	'backbone',
	'models/stateModel',
	'models/DeliveryAreaModel'
	], function (_, Backbone, stateModel, DeliveryAreaModel) {

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel,

		url: function () {
			return '/api/stores/' + stateModel.get('storeAlias') + '/deliveryareas';
		}
	});

	return DeliveryAreasCollection;
});