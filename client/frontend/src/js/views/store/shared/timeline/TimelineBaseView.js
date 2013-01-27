// Filename: src/js/views/store/shared/TimelineBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemsStageBaseView',
	'views/store/shared/timeline/ItemsOverlayBaseView'
	], function ($, _, Backbone, ItemsStageBaseView, ItemsOverlayBaseView) {

	var TimelineBaseView = Backbone.View.extend({

		itemsStageView: null,
		itemsOverlayView: null,

		initialize: function () {
			if (this.collection.length > 0) {
				this.render();
			}
		},

		render: function () {
			var $stage = this.$('.stageTimeline'),
				$overlay = this.$('.overlayFrameWrapperTimeline'),
				$stageContainer = $('<div class="itemsTimeline">').appendTo($stage),
				$overlayContainer = $('<div class="itemsTimeline">').appendTo($overlay);

			this.renderItemsStage($stageContainer);

			this.renderItemsOverlay($overlayContainer);
		},

		renderItemsStage: function ($stageContainer) {
			this.itemsStageView = new ItemsStageBaseView({
				collection: this.collection,
				el: $stageContainer
			});
		},

		renderItemsOverlay: function ($overlayContainer) {
			this.itemsOverlayView = new ItemsOverlayBaseView({
				collection: this.collection,
				el: $overlayContainer
			});
		},

		// delegate remove
		remove: function () {

			if (this.collection.length > 0) {
				this.itemsStageView.remove();
				this.itemsOverlayView.remove();

				// destroy all timelineitems
				this.collection.each(function (timelineItemModel) {
					timelineItemModel.destroy();
				});
			}

		}

	});

	return TimelineBaseView;

});