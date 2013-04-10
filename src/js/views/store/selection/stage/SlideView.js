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

			// adjust width
			this.adjustWidth();

			// center vertical
			var $slideContainer = this.$el.parent(),
				wrappedHeight = $slideContainer.height(),
				totalHeight = this.el.scrollHeight,
				newHeight, marginTop, overflowY;

			if (totalHeight < wrappedHeight) {
				newHeight = totalHeight;
				overflowY = 'hidden';
				marginTop = (wrappedHeight - totalHeight) / 2;
			} else {
				newHeight = wrappedHeight;
				overflowY = 'auto';
				marginTop = 0;
			}

			this.$el.css({
				height: newHeight,
				overflowY: overflowY,
				marginTop: marginTop
			});
			
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
			this.el = $el.get(0);

			// adjust width
			this.adjustWidth();

		}


	});

	return SlideView;

});