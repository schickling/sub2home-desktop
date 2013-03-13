// Filename: src/js/views/store/checkout/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/PageView',
    'views/store/checkout/CountdownView',
    'text!templates/store/checkout/MainTemplate.html'
    ], function ($, _, Backbone, PageView, CountdownView, MainTemplate) {

	var MainView = PageView.extend({

		subViews: {
			countdownView: null
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			this.countdownView = new CountdownView({
				el: this.$('#checkoutNote')
			});

			this.append();

		}


	});

	return MainView;

});