// Filename: src/js/views/store/tray/MinimumValueView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/cartModel',
    'text!templates/store/tray/MinimumValueTemplate.html'
], function ($, _, Backbone, router, cartModel, MinimumValueTemplate) {

	var MinimumValueView = Backbone.View.extend({

		template: _.template(MinimumValueTemplate),

		events: {
			'click': '_navigateToHome'
		},

		initialize: function () {

			this._render();

			this.listenTo(cartModel, 'change', this._render);

		},

		_render: function () {

			var json = {
				minimumValue: cartModel.getMinimumValue()
			};

			this.$el.html(this.template(json));
			this.$el.toggle(!cartModel.isMinimumReached());

		},

		_navigateToHome: function () {
			router.navigate('store', true);
		},

		destroy: function () {
			this.stopListening();
		}

	});

	return MinimumValueView;

});