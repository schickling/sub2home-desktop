// Filename: src/js/views/store/selection/ItemStageView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemStageBaseView'
	], function ($, _, Backbone, ItemStageBaseView) {

	var ItemStageView = ItemStageBaseView.extend({

		disabled: false,

		events: {
			'click': 'navigate'
		},

		initialize: function () {
			var self = this;

			this.render();

			this.update();

			this.model.on('change', this.update, this);

			this.model.on('highlight', this.highlight, this);
		},

		update: function () {

			// locked
			this.$el.toggleClass('locked', this.model.get('locked'));

			// disabled
			this.$el.toggleClass('disabled', this.model.get('disabled'));

			// visited
			this.$el.toggleClass('visited', this.model.get('visited'));

		},

		navigate: function () {
			if (!this.model.get('disabled')) {
				this.model.set('active', true);
			}
		},

		highlight: function () {
			this.$el.css({
				backgroundColor: '#000000'
			});
		}

	});

	return ItemStageView;

});