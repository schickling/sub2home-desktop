// Filename: src/js/views/client/config/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/clientModel',
    'views/PageView',
    'views/client/config/ProfileView',
    'views/client/config/AddressView',
    'views/client/config/BankaccountView',
    'text!templates/client/config/MainTemplate.html'
    ], function ($, _, Backbone, clientModel, PageView, ProfileView, AddressView, BankaccountView, MainTemplate) {

	"use strict";

	var MainView = PageView.extend({

		// referenced sub views
		subViews: {
			profileView: null
		},

		initialize: function () {
			this.model = clientModel;

			// set page title
			this.pageTitle = 'Stammdaten ' + this.model.getName() + ' - sub2home';

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this._renderProfile();
			this._renderAddress();
			this._renderBankaccount();

			this.append();
		},

		_renderProfile: function () {
			this.subViews.profileView = new ProfileView({
				el: this.$('#clientBasics'),
				model: this.model
			});
		},

		_renderAddress: function () {
			new AddressView({
				el: this.$('#clientAddress'),
				model: this.model.get('addressModel')
			});
		},

		_renderBankaccount: function () {
			new BankaccountView({
				el: this.$('#clientBankData'),
				model: this.model.get('bankaccountModel')
			});
		}


	});

	return MainView;

});