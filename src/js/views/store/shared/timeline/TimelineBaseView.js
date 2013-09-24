// Filename: src/js/views/store/shared/TimelineBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemsStageBaseView',
	'views/store/shared/timeline/ItemsOverlayBaseView'
	], function ($, _, Backbone, ItemsStageBaseView, ItemsOverlayBaseView) {

	"use strict";

	var TimelineBaseView = Backbone.View.extend({

		itemsStageView: null,
		itemsOverlayView: null,

		$stageContainer: null,
		$overlayContainer: null,

		initialize: function () {
			if (this.collection.length > 0) {
				this.render();
			}
		},

		render: function () {
			var $stage = this.$('#stageTimeline'),
				$overlay = this.$('#overlayFrameWrapperTimeline');

			this.$stageContainer = $('<div class="itemsTimeline">').appendTo($stage);
			this.$overlayContainer = $('<div class="itemsTimeline">').appendTo($overlay);

			this.renderItemsStage();
			this.renderItemsOverlay();
		},

		renderItemsStage: function () {
			this.itemsStageView = new ItemsStageBaseView({
				collection: this.collection,
				el: this.$stageContainer
			});
		},

		renderItemsOverlay: function () {
			this.itemsOverlayView = new ItemsOverlayBaseView({
				collection: this.collection,
				el: this.$overlayContainer
			});
		},

		// delegate remove
		remove: function () {

			if (this.collection.length > 0) {
				this.itemsStageView.remove();
				this.itemsOverlayView.remove();

				// destroy all timelineitems
				_.each(this.collection.models, function (timelineItemModel) {
					timelineItemModel.destroy();
				});
			}

		}

	});

	return TimelineBaseView;

});