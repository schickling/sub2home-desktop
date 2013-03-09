// Filename: src/js/models/NotificationModel.js
define([
	'underscore',
	'backbone',
	'collections/ItemsCollection'
	], function (_, Backbone, ItemsCollection) {

	var NotificationModel = Backbone.Model.extend({

		defaults: {
			className: 'info',
			title: 'Notificationtitle',
			description: 'Notificationdescription',
			duration: 5000
		}

	});

	return NotificationModel;

});