// Filename: src/js/views/store/tray/OrderedArticleMenuView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/OrderedArticleMenuTemplate.html'
	], function ($, _, Backbone, OrderedArticleMenuTemplate) {

	var OrderedArticleMenuView = Backbone.View.extend({

		template: _.template(OrderedArticleMenuTemplate),

		className: 'menuItem',

		initialize: function () {
			this.render();
		},

		render: function () {

			var json = {
				title: this.model.get('title'),
				description: this.model.get('description'),
				image: this.model.get('largeImage')
			};

			this.$el.html(this.template(json));
		}

	});

	return OrderedArticleMenuView;

});