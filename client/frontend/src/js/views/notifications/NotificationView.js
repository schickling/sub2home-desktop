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
			'click .bClose': 'close'
		},

		initialize: function () {
			this.zIndex = this.options.zIndex;

			this.render();

			if (this.model.get('duration') > 0) {
				this.countdown();
			}
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.addClass(this.model.get('type'));
			this.$el.css({
				zIndex: this.zIndex
			});
		},

		countdown: function () {
			var self = this;

			this.timer = setTimeout(function () {
				self.destroy();
			}, this.model.get('duration'));
		},

		close: function () {
			clearTimeout(this.timer);
			this.destroy();
		},

		destroy: function () {
			var $el = this.$el;

			$el.animate({
				marginTop: -($el.outerHeight(true)),
				opacity: 0
			}, 400, function () {
				$el.remove();
			});
		}

	});

	return NotificationView;
});