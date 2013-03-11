// Filename: js/views/clients/ClientView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/clients/ClientEditView',
    'views/clients/StoresView',
    'text!templates/clients/ClientTemplate.html'
    ], function ($, _, Backbone, moment, ClientEditView, StoresView, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		className: 'client',

		template: _.template(ClientTemplate),

		events: {
			'click .foldedClient': '_toggleStoresView',
			'click .iconEditYellowSmall': '_toggleEditView',
			'click .iconAddSmall': '_addStore'
		},

		initialize: function () {
			this._render();

			this.model.on('change', this._render, this);
		},

		_render: function () {
			var addressModel = this.model.get('addressModel'),
				createdMoment = moment(this.model.get('created_at')),
				json = {
					name: addressModel.get('firstName') + ' ' + addressModel.get('lastName'),
					number: this.model.get('number'),
					createdAt: createdMoment.format('DD.MM.YYYY'),
					monthlyTurnover: 0,
					totalTurnover: 0,
					monthlyOrders: 0,
					totalOrders: 0
				};

			this.$el.html(this.template(json));
		},

		_toggleStoresView: function () {
			if (this.model.get('storesCollection').length) {
				if (this.$('.unfoldedClient').is(':visible')) {
					this._hideStoresView();
				} else {
					this._showStoresView();
				}
			}
		},

		_showStoresView: function () {
			this._hideEditView();

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
				this._renderStoresView();
			}

			$unfoldedClient.fadeIn();
		},

		_renderStoresView: function () {
			this.storesView = new StoresView({
				collection: this.model.get('storesCollection'),
				el: this.$('.unfoldedClient')
			});
		},

		_hideStoresView: function () {
			var $foldedClient = this.$('.foldedClient'),
				$unfoldedClient = this.$('.unfoldedClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings();

			$clientSiblings.removeClass('inactive');

			$unfoldedClient.fadeOut();
		},

		_toggleEditView: function () {
			if (this.$('.editClient').is(':visible')) {
				this._hideEditView();
			} else {
				this._showEditView();
			}

			return false;
		},

		_showEditView: function () {
			this._hideStoresView();

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
				this._renderEditView();
			}

			$editClient.fadeIn();
		},

		_hideEditView: function () {
			var $foldedClient = this.$('.foldedClient'),
				$editClient = this.$('.editClient'),
				$clientSiblings = $foldedClient.closest('.client').siblings();

			$clientSiblings.removeClass('inactive');

			$editClient.fadeOut();
		},

		_renderEditView: function () {
			var clientEditView = new ClientEditView({
				model: this.model,
				el: this.$('.editClient')
			});
		},

		_addStore: function () {
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
					self._showStoresView();
					self.storesView.collection.add(store);
					self.storesView._renderStore(store);
				},

				error: function (model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

			return false;
		}

	});

	return ClientView;

});