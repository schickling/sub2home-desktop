// Filename: src/js/views/store/tray/OrderedMenuView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/OrderedMenuTemplate.html'
	], function ($, _, Backbone, OrderedMenuTemplate) {

	var OrderedMenuView = Backbone.View.extend({

		template: _.template(OrderedMenuTemplate),
		
		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.addClass('orderedMenu');

			var json = {

			};

			this.$el.html(this.template(json));
		}

	});

	return OrderedMenuView;

});