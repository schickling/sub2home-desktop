// Filename: src/js/views/store/shared/timeline/ItemsOverlayBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemsBaseView',
	'views/store/shared/timeline/ItemOverlayBaseView'
	], function ($, _, Backbone, ItemsBaseView, ItemOverlayBaseView) {

	"use strict";

	var ItemsOverlayBaseView = ItemsBaseView.extend({

		renderItem: function (modelItem) {
			var itemOverlayView = new ItemOverlayBaseView({
				model: modelItem
			});

			this.$el.append(itemOverlayView.$el);
		}

	});

	return ItemsOverlayBaseView;

});