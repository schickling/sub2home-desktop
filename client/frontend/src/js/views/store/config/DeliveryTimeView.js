define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/config/DeliveryTimeTemplate.html'
    ], function ($, _, Backbone, notificationcenter, DeliveryTimeTemplate) {

	var DeliveryTimeView = Backbone.View.extend({

		parentView: null,

		className: 'deliveryTime',

		template: _.template(DeliveryTimeTemplate),

		events: {
			'focusout .deliveryTimeStartMinutes': '_updateStartMinutes',
			'focusout .deliveryTimeEndMinutes': '_updateEndMinutes',
			'keypress input': '_blurOnEnter',
			'click .bRemove': '_destroy'
		},

		initialize: function () {
			this.parentView = this.options.parentView;

			this._render();

			this.listenTo(this.model, 'invalid', function () {
				this._render();
			});

			this._listenForDestory();
		},

		_render: function () {
			var json = {
				startTime: this._renderTime(this.model.get('startMinutes')),
				endTime: this._renderTime(this.model.get('endMinutes'))
			};

			this.$el.html(this.template(json));
		},

		_destroy: function () {
			var self = this;
			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});
		},

		_updateStartMinutes: function (e) {
			var $input = this.$('.deliveryTimeStartMinutes'),
				time = $input.val();

			if (this._checkTimeFormat(time)) {
				this._updateModel({
					startMinutes: this._parseTime(time)
				});
			} else {
				this._render();
			}

		},

		_updateEndMinutes: function (e) {
			var $input = this.$('.deliveryTimeEndMinutes'),
				time = $input.val();

			if (this._checkTimeFormat(time)) {
				this._updateModel({
					endMinutes: this._parseTime(time)
				});
			} else {
				this._render();
			}
		},

		_updateModel: function (changedAttributes) {
			var self = this;

			this.model.save(changedAttributes, {
				validate: true,
				success: function () {
					notificationcenter.notify('views.store.config.deliveryTime.change.success');
				},
				error: function () {
					notificationcenter.notify('views.store.config.deliveryTime.change.error');

					// rerender
					self._render();
				}
			});
		},

		_checkTimeFormat: function (time) {
			if (time.match(/^((([01]?[0-9]|2[0-3]):[0-5][0-9])|24:00)$/)) {
				return true;
			} else {
				notificationcenter.notify('views.store.config.deliveryTime.wrongTimeFormat');
				return false;
			}
		},

		_renderTime: function (total_minutes) {
			var hours = parseInt(total_minutes / 60, 10),
				minutes = total_minutes % 60;

			if (minutes < 10) {
				minutes = '0' + minutes;
			}

			return hours + ':' + minutes;
		},

		_parseTime: function (time) {
			var parts = time.split(':');

			return parts[0] * 60 + parts[1] * 1;
		},

		_blurOnEnter: function (e) {
			if (e.keyCode != 13) return;

			var $input = $(e.target);
			$input.blur();
		},

		_listenForDestory: function () {
			this.parentView.once('destroy', function () {
				this.stopListening();
			}, this);
		}

	});

	return DeliveryTimeView;

});