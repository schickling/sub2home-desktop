// Filename: src/js/views/store/tray/ControlView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'lib/moment',
	'notificationcenter',
	'models/cartModel',
	'text!templates/store/tray/ControlTemplate.html'
	], function ($, _, Backbone, router, momentLib, notificationcenter, cartModel, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .iCart': '_checkout',
			'focusout textarea': '_saveComment',
			'click .hours .iArrowUp': '_addHour',
			'click .hours .iArrowDown': '_substractHour',
			'click .minutes .iArrowUp': '_addMinute',
			'click .minutes .iArrowDown': '_substractMinute'
		},

		initialize: function () {
			this._render();
			this._listenForDataChanges();

			// keep due date in time
			var self = this;
			setInterval(function () {
				var spareMinutes = cartModel.getSpareMinutes();

				if (spareMinutes === 0) {
					self._addMinute();
				}

			}, 60000);
		},

		_render: function () {

			var paymentMethod = '';

			switch (cartModel.getPaymentMethod()) {
			case 'cash':
				paymentMethod = 'in Bar';
				break;
			case 'ec':
				paymentMethod = 'mit EC Karte';
				break;
			case 'paypal':
				paymentMethod = 'via Paypal';
				break;
			}

			var addressModel = cartModel.getCustomerAddressModel(),
				isReady = addressModel.get('firstName') && addressModel.get('lastName') && addressModel.get('street'),
				dueDate = cartModel.getValidDueDate(),
				dueMoment = moment(dueDate),
				spareMinutes = cartModel.getSpareMinutes(),
				json = {
					hoursAreMinimum: spareMinutes < 60,
					minutesAreMinimum: spareMinutes < 1,
					dueHours: dueMoment.format('HH'),
					dueMinutes: dueMoment.format('mm'),
					isReady: isReady,
					total: cartModel.getTotal(),
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					paymentMethod: paymentMethod,
					comment: cartModel.getComment()
				};

			this.$el.html(this.template(json));
		},

		_listenForDataChanges: function () {
			cartModel.on('change', this._render, this);
		},

		_checkout: function () {

			var orderModel = cartModel.get('orderModel');

			orderModel.save({}, {
				success: function () {
					orderModel.get('orderedItemsCollection').reset();

					router.navigate('store/danke', {
						trigger: true,
						replace: true
					});
				},
				error: function (error, b) {
					notificationcenter.error(b, b);
				}
			});
		},

		_saveComment: function (e) {
			var $textarea = $(e.target),
				comment = $textarea.val();

			cartModel.setComment(comment);
		},

		_addHour: function () {
			this._addMinutesToDueDate(60);
		},

		_substractHour: function () {
			this._addMinutesToDueDate(-60);
		},

		_addMinute: function () {
			this._addMinutesToDueDate(1);
		},

		_substractMinute: function () {
			this._addMinutesToDueDate(-1);
		},

		_addMinutesToDueDate: function (minutes) {
			var currentDueDate = cartModel.getValidDueDate(),
				newDueDate = new Date(currentDueDate.getTime() + minutes * 60000),
				spareMinutes = cartModel.getSpareMinutes();

			if (spareMinutes + minutes >= 0) {
				cartModel.setDueDate(newDueDate);
			} else {
				notificationcenter.error('damn', 'yo');
			}
		}


	});

	return ControlView;

});