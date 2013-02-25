// Filename: src/js/views/client/config/ProfileView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/client/config/ProfileTemplate.html'
    ], function ($, _, Backbone, ProfileTemplate) {

	var ProfileView = Backbone.View.extend({

		template: _.template(ProfileTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var addressModel = this.model.get('addressModel'),
				json = {
					name: addressModel.get('firstName') + ' ' + addressModel.get('lastName'),
					number: this.model.get('number')
				};

			this.$el.html(this.template(json));
		}


	});

	return ProfileView;

});