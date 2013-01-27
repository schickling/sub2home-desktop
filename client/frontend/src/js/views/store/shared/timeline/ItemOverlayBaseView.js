// Filename: src/js/views/store/shared/timeline/ItemOverlayBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/shared/timeline/ItemOverlayTemplate.html'
	], function ($, _, Backbone, ItemOverlayTemplate) {

	var ItemOverlayBaseView = Backbone.View.extend({

		className: 'itemTimeline',

		template: _.template(ItemOverlayTemplate),

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		}

	});

	return ItemOverlayBaseView;

});