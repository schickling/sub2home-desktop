// Filename: src/js/views/store/selection/timeline/ItemsStageView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemsStageBaseView',
	'views/store/selection/timeline/ItemStageView'
	], function ($, _, Backbone, ItemsStageBaseView, ItemStageView) {

	"use strict";

	var ItemsStageView = ItemsStageBaseView.extend({

		render: function () {

			// render items
			_.each(this.collection.models, function (modelItem) {
				this.renderItem(modelItem);
			}, this);


			// render description
			var firstTimelineItemModel = this.collection.first();
			if (!firstTimelineItemModel.get('disabled')) {
				var $phrase = $('<div>', {
					'class': 'phrase',
					'text': firstTimelineItemModel.get('phrase')
				});

				this.$el.append($phrase);
			}
		},

		renderItem: function (modelItem) {
			var itemContentView = new ItemStageView({
				model: modelItem
			});

			this.$el.append(itemContentView.el);
		}

	});

	return ItemsStageView;

});