define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'text!templates/store/home/MenuBundleTemplate.html'
	], function ($, _, Backbone, router, MenuBundleTemplate) {

	var MenuBundleView = Backbone.View.extend({

		events: {
			'click': 'takeMenuBundle'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(_.template(MenuBundleTemplate, this.model.toJSON()));
			this.$el.addClass('menuBundle');
		},

		takeMenuBundle: function () {
			router.navigate('store/theke/menu/' + this.model.get('id'), true);
		}

	});

	return MenuBundleView;

});