// Filename: src/js/views/notifications/TooltipView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/notifications/TooltipTemplate.html'
	], function ($, _, Backbone, TooltipTemplate) {

	var TooltipView = Backbone.View.extend({

		className: 'tooltip',

		events: {
			'mouseleave': '_hide'
		},

		template: _.template(TooltipTemplate),

		top: 0,
		left: 0,

		initialize: function () {
			this.top = this.options.top;
			this.left = this.options.left;

			this._render();
		},

		_render: function () {

			var json = {
				text: this.model.get('text')
			};

			this.$el.html(this.template(json));

			this.$el.addClass(this.model.get('className'));
			this.$el.css({
				top: this.top,
				left: this.left
			});
		},

		_hide: function() {
			this.$el.fadeOut();
		},

		show: function () {
			this.$el.fadeIn();
		}

	});

	return TooltipView;
});