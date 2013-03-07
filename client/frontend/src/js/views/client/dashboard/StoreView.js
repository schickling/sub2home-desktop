// Filename: src/js/views/client/dashboard/StoresView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'momentJs',
    'router',
    'text!templates/client/dashboard/StoreTemplate.html'
    ], function ($, _, Backbone, momentLib, router, StoreTemplate) {

	var StoresView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		className: 'clientStore',

		events: {
			'click': '_navigate'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var invoicesCollection = this.model.get('invoicesCollection'),
				currentMoment = moment();

			// currentMoment.lang('de');

			var json = {
				title: this.model.get('title'),
				month: currentMoment.format('MMMM'),
				year: currentMoment.format('YYYY'),
				total: invoicesCollection.getTotalOfCurrentMonth(),
				numberOfUndoneOrders: this.model.get('numberOfUndoneOrders')
			};

			this.$el.html(this.template(json));
		},

		_navigate: function () {
			router.navigate(this.model.get('alias') + '/dashboard', true);
		}


	});

	return StoresView;

});