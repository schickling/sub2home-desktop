define([
    'underscore',
    'backbone',
    'models/DeliveryAreaModel'
    ], function (_, Backbone, DeliveryAreaModel) {

	"use strict";

	var DeliveryAreasCollection = Backbone.Collection.extend({

		model: DeliveryAreaModel

	});

	return DeliveryAreasCollection;
});