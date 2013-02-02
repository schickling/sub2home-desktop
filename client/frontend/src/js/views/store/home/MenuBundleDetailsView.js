// Filename: src/js/views/store/home/MenuBundleDetailsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'text!templates/store/home/MenuBundleDetailsTemplate.html'
	], function ($, _, Backbone, router, stateModel, MenuBundleDetailsTemplate) {

	var MenuBundleDetailsView = Backbone.View.extend({

		className: 'detailsMenu',

		template: _.template(MenuBundleDetailsTemplate),

		events: {
			'click': 'showDetails'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		},

		showDetails: function () {
			router.navigate('store/theke/menu/' + this.model.get('id'), true);
		}

	});

	return MenuBundleDetailsView;

});