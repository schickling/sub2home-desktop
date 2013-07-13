define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/config/DeliveryAreaTemplate.html'
    ], function ($, _, Backbone, notificationcenter, DeliveryAreaTemplate) {

	"use strict";

	var DeliveryAreaView = Backbone.View.extend({

		events: {
			'focusout .deliveryAreaMinimumDuration': '_updateMinimumDuration',
			'focusout .deliveryAreaMinimumValue': '_updateMinimumValue',
			'focusout .deliveryAreaPostal': '_updatePostal',
			'focusout .deliveryAreaCity': '_updateCity',
			'focusout .deliveryAreaDistrict': '_updateDistrict',
			'keypress input': '_blurOnEnter',
			'click .bRemove': '_destroy'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(_.template(DeliveryAreaTemplate, this.model.toJSON()));
		},

		_destroy: function () {
			var self = this;

			this.model.destroy({
				success: function () {
					self.$el.fadeOut(function () {
						self.remove();
					});
				}
			});

		},

		_updateMinimumDuration: function () {
			var $input = this.$('.deliveryAreaMinimumDuration'),
				minimumDuration = parseInt($input.val(), 10);

			this._updateModel({
				minimumDuration: minimumDuration
			});
		},

		_updateMinimumValue: function () {
			var $input = this.$('.deliveryAreaMinimumValue'),
				minimumValue = parseFloat($input.val());

			this._updateModel({
				minimumValue: minimumValue
			});

			$input.val(minimumValue.toFixed(2));
		},

		_updatePostal: function () {
			var $input = this.$('.deliveryAreaPostal'),
				postal = parseInt($input.val(), 10);

			this._updateModel({
				postal: postal
			});

		},

		_updateCity: function () {
			var $input = this.$('.deliveryAreaCity'),
				city = $input.val();

			this._updateModel({
				city: city
			});
		},

		_updateDistrict: function () {
			var $input = this.$('.deliveryAreaDistrict'),
				district = $input.val();

			this._updateModel({
				district: district
			});
		},

		_blurOnEnter: function (e) {
			if (e.keyCode != 13) return;

			var $input = $(e.target);
			$input.blur();
		},

		_updateModel: function (changedAttributes) {
			var self = this;

			this.model.save(changedAttributes, {
				validate: true,
				success: function () {
					notificationcenter.notify('views.store.config.deliveryArea.change.success');
				},
				error: function () {
					notificationcenter.notify('views.store.config.deliveryArea.change.error');

					// rerender
					self._render();
				}
			});
		}

	});

	return DeliveryAreaView;

});