// Filename: src/js/views/store/shared/timeline/ItemsStageBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemsBaseView',
	'views/store/shared/timeline/ItemStageBaseView'
	], function ($, _, Backbone, ItemsBaseView, ItemStageBaseView) {

	var ItemsStageBaseView = ItemsBaseView.extend({

		renderItem: function (modelItem) {
			var itemContentView = new ItemStageBaseView({
				model: modelItem
			});

			this.$el.append(itemContentView.$el);
		}

	});

	return ItemsStageBaseView;

});