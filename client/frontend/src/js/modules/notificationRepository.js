// Filename: src/js/modules/notificationRepository.js
define([
    'underscore',
    'models/NotificationModel'
    ], function (_, NotificationModel) {

	var NotificationRepository = {

		_items: {
			'meinTest': {
				title: 'Arikel sichtbar',
				description: 'Arikel sichtbar',
				className: 'success'
			}
		},

		getNotificationModel: function (alias, data) {
			var defaultItem = {
				title: alias
			},
			item = this._items[alias] || defaultItem;

			return new NotificationModel(item);
		}


	};

	return NotificationRepository;

});