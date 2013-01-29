// Filename: js/models/AddressModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var AddressModel = Backbone.Model.extend({

		urlRoot: '/api/backend/addresses'

	});

	return AddressModel;

});