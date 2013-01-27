// Filename: src/js/views/store/selection/TimelineView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/TimelineBaseView',
	'views/store/selection/timeline/ItemsStageView'
	], function ($, _, Backbone, TimelineBaseView, ItemsStageView) {

	var TimelineView = TimelineBaseView.extend({

		render: function () {
			var $stage = this.$('.stageTimeline'),
				$stageCart = $stage.find('.itemsTimeline').last(),
				$overlay = this.$('.overlayFrameWrapperTimeline'),
				$overlayCart = $overlay.find('.itemsTimeline').last(),
				$stageContainer, $overlayContainer;

			if ($stageCart.length === 0) { // cart not initalized
				$stageContainer = $('<div class="itemsTimeline">').appendTo($stage);
				$overlayContainer = $('<div class="itemsTimeline">').appendTo($overlay);
			} else {
				$stageContainer = $('<div class="itemsTimeline">').insertBefore($stageCart);
				$overlayContainer = $('<div class="itemsTimeline">').insertBefore($overlayCart);
			}

			this.renderItemsStage($stageContainer);

			this.renderItemsOverlay($overlayContainer);
		},

		renderItemsStage: function ($stageContainer) {
			this.itemsStageView = new ItemsStageView({
				collection: this.collection,
				el: $stageContainer
			});
		}

	});

	return TimelineView;

});