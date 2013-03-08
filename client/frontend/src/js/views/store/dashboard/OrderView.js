// Filename: src/js/views/store/dashboard/OrderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'moment',
	'views/store/dashboard/details/OrderDetailsView',
	'text!templates/store/dashboard/OrderTemplate.html'
	], function ($, _, Backbone, moment, OrderDetailsView, OrderTemplate) {

	var OrderView = Backbone.View.extend({

		template: _.template(OrderTemplate),

		className: 'order',

		events: {
			'click .orderHeader': 'toggleDetailsView'
		},

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

			if (orderModel.wasCreatedToday()) {
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
		},

		toggleDetailsView: function () {
			var $orderContent = this.$('.orderContent');

			if (!$orderContent.html().trim()) {
				this.renderDetailsView();
			}

			$orderContent.toggle();
		},

		renderDetailsView: function () {
			this.model.fetch({
				async: false
			});

			new OrderDetailsView({
				el: this.$('.orderContent'),
				model: this.model
			});
		}

	});

	return OrderView;

});