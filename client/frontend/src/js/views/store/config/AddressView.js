define([
	'jquery',
	'underscore',
	'backbone',
	'models/AddressModel',
	'text!templates/store/config/AddressTemplate.html'
	], function($, _, Backbone, AddressModel, AddressTemplate) {

	var AddressView = Backbone.View.extend({

		events: {
			'focusout input': 'update'
		},

		initialize: function() {
			var self = this;

			this.model = new AddressModel();
			this.model.fetch({
				success: function() {
					self.render();
				}
			});
		},

		render: function() {
			this.$el.html(_.template(AddressTemplate, this.model.toJSON()));
		},

		update: function (e) {
			var $input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val();

			this.model.set(field, val);
			this.model.save();
		}

	});

	return AddressView;

});