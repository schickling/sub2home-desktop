// Filename: src/js/lang/notificationsLanguage.js
define([
	'underscore'
	], function (_) {

	var NotificationsLanguage = {

		_titles: {
			'articles.edit.success.isActive': 'Arikel sichtbar',
			'articles.edit.success.isNotActive': 'Arikel nicht sichtbar',
			'orders.testOrder.success': 'Testbestellung is raus',
			'orders.testOrder.error': 'Testbestellung ging nicht',
			'store.tray.minimumNotReached': 'Mindestbestellwert unso'
		},

		_descriptions: {
			'articles.edit.success.isActive': 'Arikel sichtbar !!',
			'articles.edit.success.isNotActive': 'Arikel nicht sichtbar !!',
			'orders.testOrder.success': 'Testbestellung is raus',
			'orders.testOrder.error': 'Testbestellung ging nicht',
			'store.tray.minimumNotReached': 'Mindestbestellwert unso'
		},

		getTitle: function (title) {
			if (_.has(this._titles, title)) {
				title = this._titles[title];
			}

			return title;
		},

		getDescription: function (description) {
			if (_.has(this._descriptions, description)) {
				description = this._descriptions[description];
			}

			return description;
		}

	};

	return NotificationsLanguage;

});