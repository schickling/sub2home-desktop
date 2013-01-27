define([
	'underscore',
	'backbone',
	'models/stateModel'
	], function (_, Backbone, stateModel) {

	var DeliveryAreaModel = Backbone.Model.extend({

		defaults: {
			id: 0,
			minimumValue: 0,
			minimumDuration: 0,
			postal: 0,

			selected: false
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + stateModel.get('storeAlias') + '/deliveryareas';
		}
	});

	return DeliveryAreaModel;

});