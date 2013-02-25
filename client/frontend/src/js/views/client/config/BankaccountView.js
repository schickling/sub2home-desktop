// Filename: src/js/views/client/config/BankaccountView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/client/config/BankaccountTemplate.html'
    ], function ($, _, Backbone, BankaccountTemplate) {

	var BankaccountView = Backbone.View.extend({

		template: _.template(BankaccountTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}


	});

	return BankaccountView;

});