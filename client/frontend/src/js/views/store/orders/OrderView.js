// Filename: src/js/views/store/orders/OrderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'lib/moment',
	'text!templates/store/orders/OrderTemplate.html'
	], function ($, _, Backbone, momentLib, OrderTemplate) {

	var OrderView = Backbone.View.extend({

		template: _.template(OrderTemplate),

		className: 'order',

		initialize: function () {
			this.render();
		},

		render: function () {
			var orderModel = this.model,
				addressModel = orderModel.get('addressModel'),
				createdDate = orderModel.get('createdDate'),
				createdMoment = moment(createdDate),
				dueDate = orderModel.get('createdDate'),
				dueTime = createdMoment.format('HH:mm'),
				dateOrTime;

			if (orderModel.isToday()) {
				dateOrTime = createdMoment.format('HH:mm');
			} else {
				dateOrTime = createdMoment.format('DD.MM.YYYY');
			}

			var json = {
				id: orderModel.get('id'),
				total: orderModel.get('total'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city'),
				dueTime: dueTime,
				dateOrTime: dateOrTime
			};

			this.$el.html(this.template(json));
		}

	});

	return OrderView;

});