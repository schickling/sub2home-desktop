// Filename: src/js/views/store/dashboard/OrderView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'notificationcenter',
    'views/store/dashboard/details/OrderDetailsView',
    'text!templates/store/dashboard/OrderTemplate.html'
    ], function ($, _, Backbone, moment, notificationcenter, OrderDetailsView, OrderTemplate) {

	var OrderView = Backbone.View.extend({

		template: _.template(OrderTemplate),

		className: 'order',

		events: {
			'click .orderHeader': '_toggleDetailsView',
			'click .orderStatus': '_toggleIsDelivered',
			'click .resendmail': '_resendMail',
			'mouseenter .bMail': '_showResendMailTooltip',
			'mouseleave .bMail': '_dismissTooltip'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var orderModel = this.model,
				addressModel = orderModel.get('addressModel'),
				dueDate = orderModel.get('dueDate'),
				createdDate = orderModel.get('createdDate'),
				createdMoment = moment(createdDate),
				dueMoment = moment(dueDate),
				dueTime = dueMoment.format('HH:mm'),
				dateOrTime = this._getDateOrTime();

			var json = {
				number: orderModel.getNumber(),
				paymentMethodClass: this._getPaymentMethodClass(),
				total: orderModel.get('total'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city'),
				district: addressModel.get('district'),
				dueTime: dueTime,
				dateOrTime: dateOrTime,
				isDelivered: orderModel.get('isDelivered'),
				hasCredit: orderModel.hasCredit()
			};

			this.$el.html(this.template(json));
		},

		_toggleDetailsView: function () {
			var $orderContent = this.$('.orderContent');

			if (!$orderContent.html().trim()) {
				this._renderDetailsView();
			}

			$orderContent.toggle();
		},

		_renderDetailsView: function () {
			this.model.fetch({
				async: false
			});

			new OrderDetailsView({
				el: this.$('.orderContent'),
				model: this.model
			});
		},

		_getDateOrTime: function () {
			var createdDate = this.model.get('createdDate'),
				createdMoment = moment(createdDate);

			if (this.model.wasCreatedToday()) {
				return createdMoment.format('HH:mm');
			} else {
				return createdMoment.format('DD.MM.YYYY');
			}
		},

		_getPaymentMethodClass: function () {
			var paymentMethod = this.model.get('paymentMethod'),
				paymentMethodClass;

			switch (paymentMethod) {
				case 'paypal':
					paymentMethodClass = 'bPaypal';
					break;
				case 'cash':
					paymentMethodClass = 'bCash';
					break;
				case 'ec':
					paymentMethodClass = 'bEC';
					break;
			}

			return paymentMethodClass;
		},

		_toggleIsDelivered: function () {
			var isDelivered = !this.model.get('isDelivered'),
				$isDelivered = this.$('.orderStatus');

			this.model.save({
				isDelivered: isDelivered
			}, {
				success: function () {
					$isDelivered.toggleClass('delivered', isDelivered);
				}
			});

			// prevent detail to toggle
			return false;
		},

		_resendMail: function () {
			var url = this.model.url() + '/resendmail';

			$.ajax({
				url: url,
				type: 'post',
				success: function () {
					notificationcenter.notify('views.store.dashboard.resendMail.success');
				},
				error: function () {
					notificationcenter.notify('views.store.dashboard.resendMail.error');
				}
			});


			// prevent detail to toggle
			return false;
		},

		_showResendMailTooltip: function (e) {
			var $button = $(e.target),
				offset = $button.offset();

			notificationcenter.tooltip('views.store.dashboard.resendMail', offset.top + 23, offset.left + 15);
		},

		_dismissTooltip: function () {
			notificationcenter.hideTooltip();
		}

	});

	return OrderView;

});