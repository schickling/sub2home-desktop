// Filename: src/js/views/client/dashboard/StoresView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'text!templates/client/dashboard/StoreTemplate.html'
	], function ($, _, Backbone, router, StoreTemplate) {

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
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));
		},

		_navigate: function () {
			router.navigate(this.model.get('alias'), true);
		}


	});

	return StoresView;

});