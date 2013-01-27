define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/config/DeliveryTimeTemplate.html'
	], function($, _, Backbone, DeliveryTimeTemplate) {

	var DeliveryTimeView = Backbone.View.extend({

		className: 'delivery_time',

		events: {
			'focusout .deliveryTimeStartMinutes': 'updateStartMinutes',
			'keypress .deliveryTimeStartMinutes': 'updateStartMinutesOnEnter',
			'focusout .deliveryTimeEndMinutes': 'updateEndMinutes',
			'keypress .deliveryTimeEndMinutes': 'updateEndMinutesOnEnter',
			'click .button_remove': 'destroy'
		},

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html(_.template(DeliveryTimeTemplate, {
				startTime: this.renderTime(this.model.get('startMinutes')),
				endTime: this.renderTime(this.model.get('endMinutes'))
			}));
		},

		destroy: function () {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});
		},

		updateStartMinutes: function (e) {
			var $input = this.$el.find('.deliveryTimeStartMinutes'),
				time = $input.val();

			if (this.checkTime(time)) {
				this.model.set('startMinutes', this.parseTime(time));
				if (this.compareTimes()) {
					this.model.save();
				}
			}

		},

		updateStartMinutesOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryTimeStartMinutes');
			$input.blur();
		},

		updateEndMinutes: function (e) {
			var $input = this.$el.find('.deliveryTimeEndMinutes'),
				time = $input.val();

			if (this.checkTime(time)) {
				this.model.set('endMinutes', this.parseTime(time));
				if (this.compareTimes()) {
					this.model.save();
				}
			}

		},

		updateEndMinutesOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryTimeEndMinutes');
			$input.blur();
		},

		compareTimes: function () {
			var start = this.model.get('startMinutes'),
				end = this.model.get('endMinutes'),
				ret = start < end;

			if (!ret) {
				alert('Startzeit muss vor Endzeit sein.');
			}

			return start < end;
		},

		checkTime: function (time) {
			if (time.match(/^((([01]?[0-9]|2[0-3]):[0-5][0-9])|24:00)$/)) {
				return true;
			} else {
				alert('Bitte Uhrzeit im Format hh:mm eingeben.');
				return false;
			}
		},

		renderTime: function (total_minutes) {
			var hours = parseInt(total_minutes / 60, 10),
				minutes = total_minutes % 60;

			if (minutes < 10) {
				minutes = '0' + minutes;
			}

			return hours + ':' + minutes;
		},

		parseTime: function (time) {
			var parts = time.split(':');

			return parts[0] * 60 + parts[1] * 1;
		}

	});

	return DeliveryTimeView;

});