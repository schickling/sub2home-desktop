// Filename: src/js/views/store/dashboard/details/AddressView.js
define([
	'jquery',
	'underscore',
	'backbone',
    'text!templates/store/dashboard/details/AddressTemplate.html'
	], function ($, _, Backbone, AddressTemplate) {

	var AddressView = Backbone.View.extend({

		template: _.template(AddressTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}

	});

	return AddressView;

});