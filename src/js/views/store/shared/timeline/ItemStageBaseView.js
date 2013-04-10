// Filename: src/js/views/store/shared/ItemStageBaseView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/shared/timeline/ItemStageTemplate.html'
	], function ($, _, Backbone, ItemStageTemplate) {

	var ItemStageBaseView = Backbone.View.extend({

		className: 'itemTimeline',

		template: _.template(ItemStageTemplate),

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}

	});

	return ItemStageBaseView;

});