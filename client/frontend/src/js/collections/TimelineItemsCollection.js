// Filename: src/js/collections/TimelineItemsCollection.js
define([
	'underscore',
	'backbone',
	'models/TimelineItemModel'
	], function (_, Backbone, TimelineItemModel) {

	var TimelineItemsCollection = Backbone.Collection.extend({
		model: TimelineItemModel
	});

	return TimelineItemsCollection;
});