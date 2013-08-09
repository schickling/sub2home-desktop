// Filename: src/js/views/store/selection/stage/SlideView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	"use strict";

	var SlideView = Backbone.View.extend({

		className: 'slide',

		isScrollIconVisible: true,
		$scrollIcon: null,

		events: {
			'click .showAll': '_scrollDown',
			'scroll': '_hideScrollIcon'
		},

		initialize: function () {

			var self = this;

			this._renderSlideWrapper();
			this._renderScrollIcon();

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
				newHeight, marginTop,
				isScrollable = totalHeight > wrappedHeight,
				showScrollIcon = (totalHeight - wrappedHeight) > 140;

			if (isScrollable) {
				newHeight = wrappedHeight;
				marginTop = 0;
			} else {
				newHeight = totalHeight;
				marginTop = (wrappedHeight - totalHeight) / 2;
			}

			this.$el.css({
				height: newHeight,
				marginTop: marginTop
			});

			this.$el.toggleClass('isScrollable', isScrollable);
			this.$scrollIcon.toggle(showScrollIcon);

		},

		adjustWidth: function () {
			// -100 because of padding
			this.$el.width(window.innerWidth - 160);
		},

		afterInitialize: function () {},

		_renderSlideWrapper: function () {

			// wrap this.$el
			var $el = $('<div>').addClass(this.className).appendTo(this.$el);
			this.$el = $el;
			this.el = $el.get(0);

		},

		_renderScrollIcon: function () {
			var $scrollIcon = $('<div class="showAll">&#xe09b</div>');

			this.$el.append($scrollIcon);
			this.$scrollIcon = $scrollIcon;
		},

		_scrollDown: function () {
			var wrappedHeight = this.$el.parent().height();

			this.$el.animate({
				scrollTop: wrappedHeight
			});
		},

		_hideScrollIcon: function () {

			if (this.isScrollIconVisible) {
				this.$scrollIcon.fadeOut(200);
				this.isScrollIconVisible = false;
			}

		}

	});

	return SlideView;

});