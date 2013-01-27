// Filename: src/js/views/store/shared/timeline/ItemsBaseView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var ItemsBaseView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (modelItem) {
				this.renderItem(modelItem);
			}, this);
		},

		renderItem: function () {}


	});

	return ItemsBaseView;

});