// Filename: src/js/lang/notificationsLanguage.js
define([
    'underscore',
    'models/NotificationModel'
    ], function (_, NotificationModel) {

	var NotificationRepository = {

		_items: {
			'default': {
				title: 'Standard',
				description: 'Standard',
				className: 'info'
			},
			'articles.edit.success.isActive': {
				title: 'Arikel sichtbar',
				description: 'Arikel sichtbar',
				className: 'error'
			},
			'articles.edit.success.isNotActive': {
				title: 'Arikel nicht sichtbar',
				description: 'Arikel nicht sichtbar',
				className: 'error'
			},
			'orders.testOrder.success': {
				title: 'Testbestellung is raus',
				description: 'Testbestellung is raus',
				className: 'error'
			},
			'orders.testOrder.error': {
				title: 'orders.testOrder.error',
				description: 'orders.testOrder.error',
				className: 'error'
			},
			'store.tray.minimumNotReached': {
				title: 'Mindestbestellwert unso',
				description: 'Mindestbestellwert unso',
				className: 'error'
			},
			'store.tray.cartNowEmpty': {
				title: 'Jetzt isses so leer hier :(',
				description: 'Jetzt isses so leer hier :(',
				className: 'error'
			},
			'store.home.addedOrderedItemToCart': {
				title: 'Artikel is drin. Danke',
				description: 'Artikel is drin. Danke',
				className: 'error'
			}
		},

		getNotificationModel: function (alias, data) {
			var defaultItem = this._items['default'],
				item = this._items[alias] || defaultItem;

			return new NotificationModel(item);
		}


	};

	return NotificationRepository;

});