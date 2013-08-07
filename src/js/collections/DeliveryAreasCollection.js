define([
    'underscore',
    'backbone',
    'models/DeliveryAreaModel'
    ], function (_, Backbone, DeliveryAreaModel) {

	"use strict";

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel,

		comparator: function(deliveryAreaModel) {
			return deliveryAreaModel.get('postal');
		}

	});

	return DeliveryAreasCollection;
});