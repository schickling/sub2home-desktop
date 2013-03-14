//Filename: views/clients/ClientEditView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'server',
    'text!templates/clients/ClientEditTemplate.html'
    ], function ($, _, Backbone, server, ClientEditTemplate) {

	var ClientEditView = Backbone.View.extend({

		template: _.template(ClientEditTemplate),

		events: {
			'click .deleteClient': '_deleteClient',
			'focusout input.editClientAddress': '_saveAddress',
			'focusout input.editClientNumber': '_saveClientNumber',
			'click .changePassword': '_changePassword'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var clientModel = this.model,
				addressModel = clientModel.get('addressModel');

			var json = {
				number: clientModel.get('number'),
				firstName: addressModel.get('firstName'),
				lastName: addressModel.get('lastName'),
				street: addressModel.get('street'),
				streetAdditional: addressModel.get('streetAdditional'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city'),
				phone: addressModel.get('phone'),
				email: addressModel.get('email')
			};


			this.$('.editClient').html(this.template(json));
		},

		_deleteClient: function () {
			var check = confirm("Kunden wirklich löschen?"),
				self = this;

			if (check) {
				this.model.destroy({
					success: function () {
						self.$el.fadeOut(function () {
							self.hideEdit();
							self.remove();
						});
					}
				});

			}
		},

		_saveAddress: function (e) {
			var $input = $(e.target),
				val = $input.val(),
				attribute = $input.attr('data-attribute'),
				addressModel = this.model.get('addressModel');

			addressModel.set(attribute, val);
			addressModel.save();

		},

		_saveClientNumber: function () {
			var $input = this.$('.editClientNumber'),
				val = $input.val();

			this.model.save({
				number: val
			});
		},

		_changePassword: function () {
			if (this._isPasswordInputValid()) {

				var url = server.getAddress() + 'clients/' + this.model.get('id') + '/changepassword',
					password = this.$('.editClientPassword').val(),
					self = this;

				$.ajax({
					url: url,
					type: 'post',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({
						password: password
					})
				});

			} else {
				alert('Password not ok');
			}
		},

		_isPasswordInputValid: function () {
			var password = this.$('.editClientPassword').val(),
				passwordRepeat = this.$('.editClientPasswordRepeat').val();

			if (password.length < 8 || passwordRepeat.length < 8) {
				return false;
			}

			if (password !== passwordRepeat) {
				return false;
			}

			return true;
		}

	});

	return ClientEditView;
});