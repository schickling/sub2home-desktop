// Filename: src/js/views/client/config/ProfileView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/client/config/ProfileTemplate.html'
    ], function ($, _, Backbone, ProfileTemplate) {

	var ProfileView = Backbone.View.extend({

		template: _.template(ProfileTemplate),

		events: {
			'click .triggerEditPassword p': '_showPasswordFields',
			'click .submitNewPassword': '_hidePasswordFields'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var addressModel = this.model.get('addressModel'),
				json = {
					name: addressModel.get('firstName') + ' ' + addressModel.get('lastName'),
					number: this.model.get('number')
				};

			this.$el.html(this.template(json));
		},

		_showPasswordFields: function () {
			var $el = this.$el,
				$editPassword = this.$('.editPassword'),
				$triggerEditPasswordButton = this.$('.triggerEditPassword p'),
				$submitNewPassword = this.$('.submitNewPassword');

			$triggerEditPasswordButton.fadeOut();
			$submitNewPassword.fadeIn();

			$el.animate({
				paddingLeft: 622
			});

			$editPassword.delay(100).fadeIn();
		},

		_hidePasswordFields: function () {
			var $el = this.$el,
				$editPassword = this.$('.editPassword'),
				$triggerEditPasswordButton = this.$('.triggerEditPassword p'),
				$submitNewPassword = this.$('.submitNewPassword');

			$triggerEditPasswordButton.fadeIn();
			$submitNewPassword.fadeOut();

			$el.animate({
				paddingLeft: 222
			});

			$editPassword.fadeOut();
		}


	});

	return ProfileView;

});