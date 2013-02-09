// Filename: src/js/views/store/orders/details/OrderedItemView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var OrderedItemView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			console.log(this.model);
		}

	});

	return OrderedItemView;

});