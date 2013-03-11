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
			},


	// Global Notifications
	// --------------------


	// Invalid Address-Data

			'models.addressModel.invalid': {
				title: 'Falsche Adressdaten',
				description: 'Bitte geben Sie eine gültige Adresse an.',
				className: 'warning'
			},

	// Invalid Price-Data

			'models.articleModel.invalid': {
				title: 'Ungültiger Preis',
				description: 'Bitte geben Sie einen gültigen Preis ein.',
				className: 'warning'
			},

	// Invalid Bankaccount-Data

			'models.bankaccountModel.invalid': {
				title: 'Ungültige Bankverbindung',
				description: 'Bitte geben Sie eine gültige Bankverbindung an.',
				className: 'warning'
			},

	// Invalid Store-Data

			'models.storeModel.invalid': {
				title: 'Ungültige Daten',
				description: 'Bitte geben Sie gültige Daten an.',
				className: 'warning'
			},	

	// Invalid Delivery-Area

			'models.deliveryAreaModel.invalid': {
				title: 'Ungültiges Liefergebiet',
				description: 'Bitte geben Sie ein gültiges Liefergebiet an.',
				className: 'warning'
			},

	// Invalid Delivery-Time

			'models.deliveryTimeModel.invalid': {
				title: 'Ungültige Lieferzeit',
				description: 'Bitte geben Sie eine gültige Lieferzeit an',
				className: 'warning'
			},

	// Invalid Order-Data

			'models.orderModel.invalid': {
				title: 'Ungültige Bestellung',
				description: 'Entweder deine Notiz ist zu lang, oder deine Zahlmethode wird doch nicht unterstützt.',
				className: 'warning'
			},

	// Invalid Authenfication-Data

			'models.authentificationModel.tooManyErrors': {
				title: 'Zu viele Fehler',
				description: 'Probier es später nochmal.',
				className: 'warning'
			},

			'models.authentificationModel.dataWrong': {
				title: 'Nicht registiert',
				description: 'Diese Kundennummer ist nicht registriert. Vielleicht ein Tippfehler?',
				className: 'error'
			},
			

	// View-Related Notifications
	// --------------------------


	// header

			'views.header.cart.empty': {
				title: 'Dein Tablett ist leer',
				description: 'Noch ist nichts auf deinem Tablett. Das kannst du aber ändern.',
				className: 'info'
			},



	// client.config

			'views.client.config.address.success': {
				title: 'Adresse geändert',
				description: 'Ihre Adressdaten wurden erfolgreich aktualisiert.',
				className: 'success'
			},

			'views.client.config.address.error': {
				title: 'Adressänderung fehlgeschlagen',
				description: 'Ihre Adressdaten wurden nicht aktualisiert.',
				className: 'error'
			},

			'views.client.config.bankaccount.success': {
				title: 'Bankverbindung geändert',
				description: 'Ihre Kontodaten wurden erfolgreich aktualisiert.',
				className: 'success'
			},

			'views.client.config.bankaccount.error': {
				title: 'Änderung fehlgeschlagen',
				description: 'Ihre Kontodaten wurden nicht aktualisiert.',
				className: 'error'
			},

			'views.client.config.changePassword.oldPasswordWrong': {
				title: 'Falsches Passwort',
				description: 'Das ist leider nicht ihr altes Passwort.',
				className: 'warning'
			},

			'views.client.config.changePassword.invalidInput': {
				title: 'Unsicheres Passwort',
				description: 'Ihr neues Passwort muss mindestens 8 Zeichen haben.',
				className: 'warning'
			},



	// home.home

			'views.home.home.lookupLocation': {
				title: 'Einen Moment bitte',
				description: 'Dein Standort wird gerade ermittelt.',
				className: 'info'
			},

			'views.home.home.lookupFailed': {
				title: 'Hoppla, das ging schief',
				description: 'Wir konnten deinen Standort leider nicht ermitteln. Du kannst trotzdem einfach deine Postleitzahl eingeben.',
				className: 'warning'
			},

			'views.home.home.noStoresFound': {
				title: 'Kein Store in der Nähe',
				description: 'In deiner Nähe gibt es leider keinen Subway-Store, der über sub2home liefert.',
				className: 'error'
			},

			'views.home.home.selectStore': {
				title: 'Du hast die Wahl',
				description: 'In deiner Nähe befinden sich merhere Subway-Stores, such dir einfach einen aus.',
				className: 'info'
			},

			'views.home.home.selectDeliveryArea': {
				title: 'Noch etwas genauer',
				description: 'Um dir den richtigen Service bieten zu können, müssen wir noch etwas genauer wissen, wo du dich befindest. Das wars dann aber, versprochen.',
				className: 'info'
			},

			'views.home.home.storeNotInRange': {
				title: 'Sorry, zu weit weg',
				description: 'Du befindest dich außerhalb der Reichweite dieses Stores. Entscheide dich doch einfach für einen in deiner Nähe.',
				className: 'warning'
			},



	// store.assortment

			'views.store.assortment.articles.success.isActive': {
				title: 'Artikel aktiviert',
				description: 'Die gewählten Artikel sind jetzt im Store verfügbar.',
				className: 'success'
			},

			'views.store.assortment.articles.success.isNotActive': {
				title: 'Artikel deaktiviert',
				description: 'Die gewählten Artikel wurden aus Ihrem Sortiment entfernt.',
				className: 'success'
			},

			'views.store.assortment.articles.error': {
				title: 'Artikel unverändert',
				description: 'Die Änderung konnte nicht ausgeführt werden. Kontaktieren Sie bitte unseren Support.',
				className: 'error'
			},



	// store.config

			'views.store.config.address.success': {
				title: 'Einen Moment bitte',
				description: 'Dein Standort wird gerade ermittelt.',
				className: 'info'
			},

			'views.store.config.address.error': {
				title: 'Hoppla, das ging schief',
				description: 'Wir konnten deinen Standort leider nicht ermitteln. Du kannst trotzdem einfach deine Postleitzahl eingeben.',
				className: 'warning'
			},

			'views.store.config.deliveryArea.add.error': {
				title: 'Kein Store in der Nähe',
				description: 'In deiner Nähe gibt es leider keinen Subway-Store, der über sub2home liefert.',
				className: 'error'
			},

			'views.store.config.deliveryTime.wrongTimeFormat': {
				title: 'Du hast die Wahl',
				description: 'In deiner Nähe befinden sich merhere Subway-Stores, such dir einfach einen aus.',
				className: 'info'
			},

			'views.store.config.testOrder.success': {
				title: 'Noch etwas genauer',
				description: 'Um dir den richtigen Service bieten zu können, müssen wir noch etwas genauer wissen, wo du dich befindest. Das wars dann aber, versprochen.',
				className: 'info'
			},

			'views.store.config.testOrder.error': {
				title: 'Sorry, zu weit weg',
				description: 'Du befindest dich außerhalb der Reichweite dieses Stores. Entscheide dich doch einfach für einen in deiner Nähe.',
				className: 'warning'
			},

			'views.store.config.isOpen': {
				title: 'Einen Moment bitte',
				description: 'Dein Standort wird gerade ermittelt.',
				className: 'info'
			},

			'views.store.config.isClosed': {
				title: 'Hoppla, das ging schief',
				description: 'Wir konnten deinen Standort leider nicht ermitteln. Du kannst trotzdem einfach deine Postleitzahl eingeben.',
				className: 'warning'
			},

			'views.store.config.isOpenError': {
				title: 'Kein Store in der Nähe',
				description: 'In deiner Nähe gibt es leider keinen Subway-Store, der über sub2home liefert.',
				className: 'error'
			},

			'views.store.config.paymentMethods.success': {
				title: 'Du hast die Wahl',
				description: 'In deiner Nähe befinden sich merhere Subway-Stores, such dir einfach einen aus.',
				className: 'info'
			},

			'views.store.config.paymentMethods.error.paypal': {
				title: 'Noch etwas genauer',
				description: 'Um dir den richtigen Service bieten zu können, müssen wir noch etwas genauer wissen, wo du dich befindest. Das wars dann aber, versprochen.',
				className: 'info'
			},

			'views.store.config.paymentMethods.error': {
				title: 'Sorry, zu weit weg',
				description: 'Du befindest dich außerhalb der Reichweite dieses Stores. Entscheide dich doch einfach für einen in deiner Nähe.',
				className: 'warning'
			},

			'views.store.config.paymentMethods.loadPaypal': {
				title: 'Du hast die Wahl',
				description: 'In deiner Nähe befinden sich merhere Subway-Stores, such dir einfach einen aus.',
				className: 'info'
			},

			'views.store.config.info.success': {
				title: 'Noch etwas genauer',
				description: 'Um dir den richtigen Service bieten zu können, müssen wir noch etwas genauer wissen, wo du dich befindest. Das wars dann aber, versprochen.',
				className: 'info'
			},

			'views.store.config.info.error': {
				title: 'Sorry, zu weit weg',
				description: 'Du befindest dich außerhalb der Reichweite dieses Stores. Entscheide dich doch einfach für einen in deiner Nähe.',
				className: 'warning'
			},

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



// views.store.home.addedOrderedItemToCart
// views.store.selection.notReady
// views.store.tray.minimumNotReached
// views.store.tray.orderFailed
// views.store.tray.invalidDueTime
// views.store.tray.cartNowEmpty
// views.store.dashboard.testOrder.success
// views.store.dashboard.testOrder.error