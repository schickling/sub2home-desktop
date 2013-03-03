// Filename: src/js/views/client/config/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/ClientModel',
    'views/PageView',
    'views/client/config/ProfileView',
    'views/client/config/AddressView',
    'views/client/config/BankaccountView',
    'text!templates/client/config/MainTemplate.html'
    ], function ($, _, Backbone, ClientModel, PageView, ProfileView, AddressView, BankaccountView, MainTemplate) {

	var MainView = PageView.extend({

		// referenced sub views
		profileView: null,

		initialize: function () {
			this.model = new ClientModel();
			this.model.fetch({
				async: false
			});

			this._render();
			this._listenForDestory();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this._renderProfile();
			this._renderAddress();
			this._renderBankaccount();

			this.append();
		},

		_renderProfile: function () {
			this.profileView = new ProfileView({
				el: this.$('.clientBasics'),
				model: this.model
			});
		},

		_renderAddress: function () {
			new AddressView({
				el: this.$('.clientAddress'),
				model: this.model.get('addressModel')
			});
		},

		_renderBankaccount: function () {
			new BankaccountView({
				el: this.$('.clientBankData'),
				model: this.model.get('bankaccountModel')
			});
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.profileView.trigger('destroy');
			}, this);
		}


	});

	return MainView;

});