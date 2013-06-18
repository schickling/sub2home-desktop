// Filename: src/js/models/TimelineItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var TimelineItemModel = Backbone.Model.extend({

		defaults: {
			// api data
			image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/static/categories/smallimages/getraenk.png/static/sub_small.png',
			icon: '',
			phrase: '',

			// logic data
			isDisabled: false,
			isLocked: false,
			wasVisited: false,
			selectionIndex: 0, // needed for info switching
			menuUpgradeSelection: false // just needed for no upgrade detection in TimelineControllerView.js
		}

	});

	return TimelineItemModel;

});