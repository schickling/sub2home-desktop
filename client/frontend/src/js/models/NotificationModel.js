// Filename: src/js/models/NotificationModel.js
define([
	'underscore',
	'backbone',
	'collections/ItemsCollection'
	], function (_, Backbone, ItemsCollection) {

	var NotificationModel = Backbone.Model.extend({

		defaults: {
			type: '',
			title: '',
			description: '',
			duration: 0
		}

	});

	return NotificationModel;

});