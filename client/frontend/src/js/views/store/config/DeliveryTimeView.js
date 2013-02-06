define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/config/DeliveryTimeTemplate.html'
	], function ($, _, Backbone, DeliveryTimeTemplate) {

	var DeliveryTimeView = Backbone.View.extend({

		className: 'deliveryTime',

		template: _.template(DeliveryTimeTemplate),

		events: {
			'focusout .deliveryTimeStartMinutes': 'updateStartMinutes',
			'keypress .deliveryTimeStartMinutes': 'updateStartMinutesOnEnter',
			'focusout .deliveryTimeEndMinutes': 'updateEndMinutes',
			'keypress .deliveryTimeEndMinutes': 'updateEndMinutesOnEnter',
			'click .buttonRemove': 'destroy'
		},

		initialize: function () {
			this.render();

			this.model.on('error', function (model, error) {
				this.render();
				alert(error);
			}, this);
		},

		render: function () {
			var json = {
				startTime: this.renderTime(this.model.get('startMinutes')),
				endTime: this.renderTime(this.model.get('endMinutes'))
			};

			this.$el.html(this.template(json));
		},

		destroy: function () {
			var self = this;
			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});
		},

		updateStartMinutes: function (e) {
			var $input = this.$('.deliveryTimeStartMinutes'),
				time = $input.val();

			if (this.checkTime(time)) {
				this.model.set('startMinutes', this.parseTime(time));
				this.model.save();
			}

		},

		updateStartMinutesOnEnter: function (e) {
			if (e.keyCode != 13) return;

			var $input = this.$('.deliveryTimeStartMinutes');
			$input.blur();
		},

		updateEndMinutes: function (e) {
			var $input = this.$('.deliveryTimeEndMinutes'),
				time = $input.val();

			if (this.checkTime(time)) {
				this.model.set('endMinutes', this.parseTime(time));
				this.model.save();
			}

		},

		updateEndMinutesOnEnter: function (e) {
			if (e.keyCode != 13) return;

			var $input = this.$('.deliveryTimeEndMinutes');
			$input.blur();
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