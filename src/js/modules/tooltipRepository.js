// Filename: src/js/modules/tooltipRepository.js
define([
    'underscore',
    'models/TooltipModel'
    ], function (_, TooltipModel) {

	"use strict";

	var TooltipRepository = {

		_items: {
			'default': {
				text: 'Hey',
				className: 'info'
			},

			'views.home.home.input': {
				text: 'Hier funktionieren nur Zahlen',
				className: 'warning'
			},

			'store.dashboard.invoice.download': {
				text: 'Rechnung herunterladen',
				className: 'info'
			},

			'views.header.client.config': {
				text: 'Stammdaten',
				className: 'info'
			},

			'views.header.client.dashboard': {
				text: 'Store-Übersicht',
				className: 'info'
			},
			
			'views.header.store.dashboard': {
				text: 'Bestellungen & Umsätze',
				className: 'info'
			},
			
			'views.header.store.assortment': {
				text: 'Sortiment-Einstellungen',
				className: 'info'
			},

			'views.header.store.config': {
				text: 'Store-Einstellungen',
				className: 'info'
			},
			
			'views.header.logout': {
				text: 'Logout',
				className: 'info'
			},

			'views.store.dashboard.resendMail': {
				text: 'Erneut senden',
				className: 'info left'
			},

			'views.store.dashboard.invoice.download': {
				text: 'Rechnung als PDF',
				className: 'info'
			}
			
		},

		getTooltipModel: function (alias, data) {
			var defaultItem = this._items['default'],
				item = this._items[alias] || defaultItem;

			return new TooltipModel(item);
		}


	};

	return TooltipRepository;

});