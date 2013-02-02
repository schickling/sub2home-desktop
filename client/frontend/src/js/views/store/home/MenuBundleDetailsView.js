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

		className: 'menu',

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
			if (this.model.get('allowsIngredients')) {
				router.navigate('store/theke/artikel/' + this.model.get('id'), true);
			} else {
				alert('Warenkorb yo!');
			}
		}

	});

	return MenuBundleDetailsView;

});