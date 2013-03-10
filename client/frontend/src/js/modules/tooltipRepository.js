// Filename: src/js/modules/tooltipRepository.js
define([
    'underscore',
    'models/TooltipModel'
    ], function (_, TooltipModel) {

	var TooltipRepository = {

		_items: {
			'default': {
				text: 'Standard',
				className: 'info'
			},
			'store.dashboard.invoice.download': {
				text: 'Rechnung herunterladen',
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