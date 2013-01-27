define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/config/DeliveryAreaTemplate.html'
	], function($, _, Backbone, DeliveryAreaTemplate) {

	var DeliveryAreaView = Backbone.View.extend({
		events: {
			'focusout .deliveryAreaMinimumDuration': 'updateMinimumDuration',
			'keypress .deliveryAreaMinimumDuration': 'updateMinimumDurationOnEnter',
			'focusout .deliveryAreaMinimumValue': 'updateMinimumValue',
			'keypress .deliveryAreaMinimumValue': 'updateMinimumValueOnEnter',
			'focusout .deliveryAreaPostal': 'updatePostal',
			'keypress .deliveryAreaPostal': 'updatePostalOnEnter',
			'focusout .deliveryAreaDescription': 'updateDescription',
			'keypress .deliveryAreaDescription': 'updateDescriptionOnEnter',
			'click .button_remove': 'destroy'
		},

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html(_.template(DeliveryAreaTemplate, this.model.toJSON()));
		},

		destroy: function () {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});
		},

		updateMinimumDuration: function () {
			var $input = this.$el.find('.deliveryAreaMinimumDuration'),
				minimumDuration = $input.val();

			if (minimumDuration == parseInt(minimumDuration, 10)) {
				this.model.set('minimumDuration', minimumDuration);
				this.model.save();
			} else {
				alert('Bitte eine Ganzzahl eingeben');
			}

		},

		updateMinimumDurationOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryAreaMinimumDuration');
			$input.blur();
		},

		updateMinimumValue: function () {
			var $input = this.$el.find('.deliveryAreaMinimumValue'),
				minimumValue = $input.val();

			if (minimumValue == parseFloat(minimumValue)) {
				this.model.set('minimumValue', minimumValue);
				this.model.save();
			} else {
				alert('Bitte eine Flieskommazahl eingeben');
			}

		},

		updateMinimumValueOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryAreaMinimumValue');
			$input.blur();
		},

		updatePostal: function () {
			var $input = this.$el.find('.deliveryAreaPostal'),
				postal = $input.val();

			if (postal == parseInt(postal, 10) && postal > 9999 && postal < 100000) {
				this.model.set('postal', postal);
				this.model.save();
			} else {
				alert('Bitte eine Postleitzahl eingeben');
			}

		},

		updatePostalOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryAreaPostal');
			$input.blur();
		},

		updateDescription: function () {
			var $input = this.$el.find('.deliveryAreaDescription'),
				description = $input.val();

			this.model.set('description', description);
			this.model.save();

		},

		updateDescriptionOnEnter: function(e) {
			if (e.keyCode != 13) return;

			var $input = this.$el.find('.deliveryAreaDescription');
			$input.blur();
		}

	});

	return DeliveryAreaView;

});