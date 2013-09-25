// Filename: src/js/views/store/checkout/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'models/cartModel',
    'views/PageView',
    'views/store/checkout/CountdownView',
    'text!templates/store/checkout/MainTemplate.html'
    ], function ($, _, Backbone, router, cartModel, PageView, CountdownView, MainTemplate) {

	"use strict";

	var MainView = PageView.extend({

		pageTitle: 'Danke für Deine Bestellung - sub2home',

		subViews: {
			countdownView: null
		},

		initialize: function () {

			if (cartModel.get('isClosed')) {
				this.render();
			} else {
				router.navigate('store', {
					trigger: true,
					replace: true
				});
			}

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