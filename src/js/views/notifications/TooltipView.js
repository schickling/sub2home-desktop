// Filename: src/js/views/notifications/TooltipView
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/notifications/TooltipTemplate.html'
    ], function ($, _, Backbone, TooltipTemplate) {

	"use strict";

	var TooltipView = Backbone.View.extend({

		className: 'tooltip',

		template: _.template(TooltipTemplate),

		top: 0,
		left: 0,

		animationTime: 100,

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

		hide: function () {
			var $el = this.$el;

			$el.fadeOut(this.animationTime, function () {
				$el.remove();
			});
		},

		show: function () {
			this.$el.fadeIn(this.animationTime);
		}

	});

	return TooltipView;
});