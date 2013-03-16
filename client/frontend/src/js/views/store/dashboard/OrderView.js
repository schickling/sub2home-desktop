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
			'click .orderHeader': '_toggleDetailsView'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var orderModel = this.model,
				addressModel = orderModel.get('addressModel'),
				dueDate = orderModel.get('createdDate'),
				createdDate = orderModel.get('createdDate'),
				createdMoment = moment(createdDate)
				dueTime = createdMoment.format('HH:mm'),
				dateOrTime = this._getDateOrTime();

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
		}

	});

	return OrderView;

});