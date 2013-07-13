// Filename: src/js/views/store/selection/ItemStageView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/shared/timeline/ItemStageBaseView'
	], function ($, _, Backbone, ItemStageBaseView) {

	"use strict";

	var ItemStageView = ItemStageBaseView.extend({

		disabled: false,

		events: {
			'click': '_navigate'
		},

		initialize: function () {
			var self = this;

			this.render();

			this._update();

			this.model.on('change', this._update, this);

			this.model.on('highlight', this._highlight, this);
		},

		_update: function () {

			// locked
			this.$el.toggleClass('locked', this.model.get('isLocked'));

			// disabled
			this.$el.toggleClass('disabled', this.model.get('isDisabled'));

			// visited
			this.$el.toggleClass('visited', this.model.get('wasVisited'));

		},

		_navigate: function () {
			if (!this.model.get('isDisabled')) {
				this.model.set('isActive', true);
			}
		},

		_highlight: function () {
			this.$el.css({
				color: '#dc952b'
			});
		}

	});

	return ItemStageView;

});