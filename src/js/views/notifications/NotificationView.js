// Filename: src/js/views/notifications/NotificationView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/notifications/NotificationTemplate.html'
	], function ($, _, Backbone, NotificationTemplate) {

	var NotificationView = Backbone.View.extend({

		className: 'notification',

		template: _.template(NotificationTemplate),

		timer: 0,

		zIndex: 0,

		events: {
			'click .bClose': '_close',
			// custom dom event needed to clear all notifications
			'close': '_close',
			'mouseenter': '_stopTimer',
			'mouseleave': '_countdown'
		},

		initialize: function () {
			this.zIndex = this.options.zIndex;

			this._render();

			this._countdown();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.addClass(this.model.get('className'));
			this.$el.css({
				zIndex: this.zIndex
			});
		},

		_countdown: function () {
			if (this.model.get('duration') > 0) {
				var self = this;

				this.timer = setTimeout(function () {
					self._destroy();
				}, this.model.get('duration'));
			}
		},

		_stopTimer: function () {
			clearTimeout(this.timer);
		},

		_close: function () {
			this._stopTimer();
			this._destroy();
		},

		_destroy: function () {
			var $el = this.$el;

			$el.animate({
				marginTop: -($el.outerHeight(true)),
				opacity: 0
			}, 400, function () {
				$el.remove();
			});
		},

		slideIn: function () {
			var $el = this.$el;

			$el.css({
				marginTop: -($el.outerHeight(true))
			}).animate({
				marginTop: 0,
				opacity: 1
			}, 300);
		}

	});

	return NotificationView;
});