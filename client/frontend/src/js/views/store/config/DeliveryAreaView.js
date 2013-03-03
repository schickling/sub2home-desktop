define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/config/DeliveryAreaTemplate.html'
    ], function ($, _, Backbone, notificationcenter, DeliveryAreaTemplate) {

	var DeliveryAreaView = Backbone.View.extend({

		events: {
			'focusout .deliveryAreaMinimumDuration': '_updateMinimumDuration',
			'focusout .deliveryAreaMinimumValue': '_updateMinimumValue',
			'focusout .deliveryAreaPostal': '_updatePostal',
			'focusout .deliveryAreaDescription': '_updateDescription',
			'keypress input': '_blurOnEnter',
			'click .sBRemove': '_destroy'
		},

		parentView: null,

		initialize: function () {
			this.parentView = this.options.parentView;

			this._render();

			this.listenTo(this.model, 'invalid', function (model, error) {
				this._render();
				notificationcenter.error(error, error);
			});

			this._listenForDestory();
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

			this.model.set({
				minimumDuration: minimumDuration
			}, {
				validate: true
			});
			this.model.save();
		},

		_updateMinimumValue: function () {
			var $input = this.$('.deliveryAreaMinimumValue'),
				minimumValue = parseFloat($input.val());

			this.model.set({
				minimumValue: minimumValue
			}, {
				validate: true
			});
			this.model.save();
		},

		_updatePostal: function () {
			var $input = this.$('.deliveryAreaPostal'),
				postal = parseInt($input.val(), 10);

			this.model.set({
				postal: postal
			}, {
				validate: true
			});
			this.model.save();
		},

		_updateDescription: function () {
			var $input = this.$('.deliveryAreaDescription'),
				description = $input.val();

			this.model.set({
				description: description
			}, {
				validate: true
			});
			this.model.save();
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

	return DeliveryAreaView;

});