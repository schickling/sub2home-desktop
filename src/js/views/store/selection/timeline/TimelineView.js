// Filename: src/js/views/store/selection/TimelineView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/TimelineBaseView',
	'views/store/selection/timeline/ItemsStageView'
	], function ($, _, Backbone, TimelineBaseView, ItemsStageView) {

	"use strict";

	var TimelineView = TimelineBaseView.extend({

		render: function () {
			var insertIndex = this.options.insertIndex || -1,
				$stage = this.$('#stageTimeline'),
				$stageInsertElement = $stage.find('.itemsTimeline').eq(insertIndex),
				$overlay = this.$('#overlayFrameWrapperTimeline'),
				$overlayInsertElement = $overlay.find('.itemsTimeline').eq(insertIndex);

			this.$stageContainer = $('<div class="itemsTimeline">').insertBefore($stageInsertElement);
			this.$overlayContainer = $('<div class="itemsTimeline">').insertBefore($overlayInsertElement);

			this.renderItemsStage();
			this.renderItemsOverlay();
		},

		renderItemsStage: function () {
			this.itemsStageView = new ItemsStageView({
				collection: this.collection,
				el: this.$stageContainer
			});
		}

	});

	return TimelineView;

});