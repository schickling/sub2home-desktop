// Filename: src/js/views/store/selection/CartTimelineView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/timeline/TimelineView'
	], function ($, _, Backbone, TimelineView) {

	"use strict";

	var CartTimelineView = TimelineView.extend({

		render: function () {
			var $stage = this.$('#stageTimeline'),
				$stageCart = $stage.find('.itemsTimeline').last(),
				$overlay = this.$('#overlayFrameWrapperTimeline');

			this.$stageContainer = $('<div class="itemsTimeline">').appendTo($stage);
			this.$overlayContainer = $('<div class="itemsTimeline">').appendTo($overlay);

			this.renderItemsStage();
			this.renderItemsOverlay();
		}

	});

	return CartTimelineView;

});