// Filename: src/js/models/TimelineItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var TimelineItemModel = Backbone.Model.extend({

		defaults: {
			// api data
			image: '../../../img/static/sub_small.png',
			icon: '',
			phrase: '',

			// logic data
			disabled: false,
			locked: false,
			visited: false,
			selectionIndex: 0,
			menuUpgradeSelection: false // just needed for no upgrade detection in TimelineControllerView.js
		}

	});

	return TimelineItemModel;

});