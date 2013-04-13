// Filename: src/js/views/client/config/ProfileView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/client/config/ProfileTemplate.html'
    ], function ($, _, Backbone, notificationcenter, ProfileTemplate) {

	var ProfileView = Backbone.View.extend({

		template: _.template(ProfileTemplate),

		events: {
			'click #triggerEditPassword p': '_showPasswordFields',
			'click #submitNewPassword': '_saveNewPassword',
			'click #cancelEditPassword': '_hidePasswordFields',
			'keyup #editPassword input': '_updateSubmitButton',
			'keypress #editPassword input': '_checkEnterKey'
		},

		initialize: function () {
			this._render();
			this._listenToNameChange();
		},

		_render: function () {
			var addressModel = this.model.get('addressModel'),
				json = {
					name: addressModel.get('firstName') + ' ' + addressModel.get('lastName'),
					number: this.model.get('number')
				};

			this.$el.html(this.template(json));
		},

		_listenToNameChange: function () {
			var addressModel = this.model.get('addressModel');

			this.listenTo(addressModel, 'change:firstName change:lastName', this._render);
		},

		_showPasswordFields: function () {
			var animationTime = 300,
				$el = this.$el,
				$editPassword = this.$('#editPassword'),
				$triggerEditPasswordButton = this.$('#triggerEditPassword p'),
				$cancelEditPassword = this.$('#cancelEditPassword'),
				$submitNewPassword = this.$('#submitNewPassword');

			$triggerEditPasswordButton.fadeOut(animationTime / 2, function () {
				$submitNewPassword.fadeIn(animationTime / 2);
			});

			$cancelEditPassword.delay(animationTime / 2).fadeIn(animationTime / 2);

			$el.animate({
				paddingLeft: 622
			}, animationTime);

			$editPassword.delay(100).fadeIn(animationTime - 100, function () {
				$editPassword.find('input').first().focus();
			});
		},

		_hidePasswordFields: function () {
			var animationTime = 300,
				$el = this.$el,
				$editPassword = this.$('#editPassword'),
				$inputs = $editPassword.find('input'),
				$triggerEditPasswordButton = this.$('#triggerEditPassword p'),
				$cancelEditPassword = this.$('#cancelEditPassword'),
				$submitNewPassword = this.$('#submitNewPassword');

			$submitNewPassword.fadeOut(animationTime / 2, function () {
				$triggerEditPasswordButton.fadeIn(animationTime / 2);

				// clear inputs
				$inputs.val('');
			});

			$cancelEditPassword.fadeOut(animationTime / 2);

			$el.animate({
				paddingLeft: 222
			}, animationTime);

			$editPassword.fadeOut(animationTime);
		},

		_saveNewPassword: function () {
			if (this._isInputValid()) {

				var currentPassword = this.$('#currentPassword').val(),
					newPassword = this.$('#newPasswordFirst').val(),
					self = this;

				$.ajax({
					url: 'clients/changepassword',
					type: 'post',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({
						currentPassword: currentPassword,
						newPassword: newPassword
					}),
					success: function () {
						self._hidePasswordFields();
						notificationcenter.notify('views.client.config.changePassword.success');
					},
					error: function () {
						notificationcenter.notify('views.client.config.changePassword.oldPasswordWrong');
					}
				});

			} else {
				notificationcenter.notify('views.client.config.changePassword.invalidInput');
			}
		},

		_updateSubmitButton: function () {
			var $submitNewPassword = this.$('#submitNewPassword');

			$submitNewPassword.toggleClass('valid', this._isInputValid());
		},

		_isInputValid: function () {
			var currentPassword = this.$('#currentPassword').val(),
				newPasswordFirst = this.$('#newPasswordFirst').val(),
				newPasswordSecond = this.$('#newPasswordSecond').val();

			if (currentPassword.length < 8 || newPasswordFirst.length < 8 || newPasswordSecond.length < 8) {
				return false;
			}

			if (newPasswordFirst !== newPasswordSecond) {
				return false;
			}

			return true;
		},

		_checkEnterKey: function (e) {
			if (e.keyCode === 13) {
				this._saveNewPassword();
			}
		},

		destroy: function () {
			this.stopListening();
		}


	});

	return ProfileView;

});