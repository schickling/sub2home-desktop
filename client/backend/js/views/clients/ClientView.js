// Filename: js/views/clients/ClientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/clients/ClientEditView',
	'views/clients/StoresView',
	'text!templates/clients/ClientTemplate.html'
	], function ($, _, Backbone, ClientEditView, StoresView, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		className: 'client',

		template: _.template(ClientTemplate),

		events: {
			'click .foldedClient': 'toggleStoresView',
			'click .editClient': 'toggleEditView',
			'click .iconAddSmall': 'addStore'
		},

		initialize: function () {
			this.render();

			this.model.on('change', this.render, this);
		},

		render: function () {
			var addressModel = this.model.get('addressModel'),
				json = {
					name: addressModel.get('firstName') + ' ' + addressModel.get('lastName'),
					number: this.leadingZeros(this.model.get('number')),
					created_at: this.model.get('created_at'),
					monthlyTurnover: 0,
					totalTurnover: 0,
					monthlyOrders: 0,
					totalOrders: 0
				};

			this.$el.html(this.template(json));

			return this;
		},

		toggleStoresView: function () {
			if (this.model.get('storesCollection').length) {
				if (this.$('.unfoldedClient').is(':visible')) {
					this.hideStoresView();
				} else {
					this.showStoresView();
				}
			}
		},

		showStoresView: function () {
			this.hideEditView();

			var $foldedClient = this.$('.foldedClient'),
				$unfoldedClient = this.$('.unfoldedClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings(),
				$editClientSiblings = $clientSiblings.find('.editClient'),
				$unfoldedClientSiblings = $clientSiblings.find('.unfoldedClient');

			$editClientSiblings.hide();
			$unfoldedClientSiblings.hide();

			$clientSiblings.addClass('inactive');

			this.$el.removeClass('inactive');

			if (!this.storesView) {
				this.renderStoresView();
			}

			$unfoldedClient.fadeIn();
		},

		renderStoresView: function () {
			this.storesView = new StoresView({
				collection: this.model.get('storesCollection'),
				el: this.$('.unfoldedClient')
			});
		},

		hideStoresView: function () {
			var $foldedClient = this.$('.foldedClient'),
				$unfoldedClient = this.$('.unfoldedClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings();

			$clientSiblings.removeClass('inactive');

			$unfoldedClient.fadeOut();
		},

		toggleEditView: function () {
			if (this.$('.editClient').is(':visible')) {
				this.hideEditView();
			} else {
				this.showEditView();
			}

			return false;
		},

		showEditView: function () {
			this.hideStoresView();

			var $foldedClient = this.$('.foldedClient'),
				$editClient = this.$('.editClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings(),
				$editClientSiblings = $clientSiblings.find('.editClient'),
				$unfoldedClientSiblings = $clientSiblings.find('.unfoldedClient');

			// hide other client edit views
			$editClientSiblings.hide();
			$unfoldedClientSiblings.hide();
			$clientSiblings.addClass('inactive');

			this.$el.removeClass('inactive');

			// lazy initalize client edit view
			if (!$editClient.html().trim()) {
				this.renderEditView();
			}

			$editClient.fadeIn();
		},

		hideEditView: function () {
			var $foldedClient = this.$('.foldedClient'),
				$editClient = this.$('.editClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings();

			$clientSiblings.removeClass('inactive');

			$editClient.fadeOut();
		},

		renderEditView: function () {
			var clientEditView = new ClientEditView({
				model: this.model,
				el: this.$('.editClient')
			});
		},

		addStore: function () {
			var str, number;

			do {
				str = prompt('Geben Sie die Storenummer des neuen Stores ein.', '');
				number = parseInt(str, 10);
				// check cancel
				if (str === null) return false;
			} while (str !== number || number < 10000 || number > 99999);

			var self = this,
				store = new Store({
					number: number,
					client_model_id: this.model.get('id')
				});

			store.save({}, {
				success: function () {
					self.showStoresView();
					self.storesView.collection.add(store);
					self.storesView.renderStore(store);
				},

				error: function (model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

			return false;
		},

		leadingZeros: function (number) {
			var str = '' + number,
				length = 4;
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		}

	});

	return ClientView;

});