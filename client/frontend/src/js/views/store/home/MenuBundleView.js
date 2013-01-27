define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/home/MenuBundleTemplate.html'
	], function($, _, Backbone, MenuBundleTemplate) {

	var MenuBundleView = Backbone.View.extend({

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(_.template(MenuBundleTemplate, this.model.toJSON()));
			this.$el.addClass('menuBundle');
		}

	});

	return MenuBundleView;

});