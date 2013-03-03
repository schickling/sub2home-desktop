// Filename: src/js/views/store/selection/stage/SlideView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var SlideView = Backbone.View.extend({

		className: 'slide',

		initialize: function () {

			var self = this;

			this._renderSlideWrapper();

			this.afterInitialize();

			this.$el.parent().on('align', function () {
				self._alignView();
			});

		},

		_alignView: function () {
			// center vertical
			var $slideContainer = this.$el.parent(),
				wrappedHeight = $slideContainer.height(),
				totalHeight = this.$el[0].scrollHeight;

			if (totalHeight < wrappedHeight) {
				this.$el.css({
					paddingTop: (wrappedHeight - totalHeight) / 2
				});
			} else {
				// enable scrolling
				$slideContainer.css({
					overflowY: 'auto'
				});
			}

			// adjust width
			this.adjustWidth();
		},

		adjustWidth: function () {
			// -100 because of padding
			this.$el.width(window.innerWidth - 100);
		},

		afterInitialize: function () {},

		_renderSlideWrapper: function () {

			// wrap this.$el
			var $el = $('<div>').addClass(this.className).appendTo(this.$el);
			this.$el = $el;

			// adjust width
			this.adjustWidth();

		}


	});

	return SlideView;

});