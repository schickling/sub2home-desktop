// Filename: src/js/views/client/config/BankaccountView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/client/config/BankaccountTemplate.html'
    ], function ($, _, Backbone, notificationcenter, BankaccountTemplate) {

	var BankaccountView = Backbone.View.extend({

		template: _.template(BankaccountTemplate),

		events: {
			'focusout input': '_update'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		},

		_update: function (e) {
			var $input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val();

			// check if value really changed
			if (val !== this.model.get(field)) {

				this.model.set(field, val);

				this.model.save({}, {
					success: function () {
						notificationcenter.notify('Bankdaten gespeichert');
					},
					error: function () {
						notificationcenter.notify('Fehler :(');
					}
				});
			}

		}

	});

	return BankaccountView;

});