// Filename: src/js/views/store/tray/FreeCookieView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/FreeCookieTemplate.html'
], function ($, _, Backbone, notificationcenter, cartModel, FreeCookieTemplate) {

	"use strict";

	var FreeCookieView = Backbone.View.extend({

		template: _.template(FreeCookieTemplate),

		events: {
			'focusin input': '_extendInput',
			'focusout input': '_checkCollapseInput'
		},

		initialize: function () {
			this._render();
			this._cacheDom();
		},

		_render: function () {

			var orderModel = cartModel.get('orderModel'),
				couponCode = orderModel.get('couponCode');

			var json = {
				code: couponCode
			};

			this.$el.html(this.template(json));
			this._markHasCode();
		},

		_markHasCode: function() {
			var orderModel = cartModel.get('orderModel');

			this.$el.toggleClass('hasCode', orderModel.get('couponCode') !== '');
		},

		_markIsValid: function() {
			this.$el.toggleClass('valid', cartModel.isCouponCodeValid());
		},

		_cacheDom: function () {
			this.$input = this.$('input');
			this.$label = this.$('label');
		},

		_extendInput: function () {
			this.$label.fadeOut(70);

			this.$input.delay(70).animate({
				width: 390
			}, 150);
		},

		_checkCollapseInput: function () {

			this._saveCode();
			this._markHasCode();
			this._markIsValid();

			if (!this.$input.val()) {
				this._collapseInput();
			} else {
				this._checkCode();
			}
		},

		_collapseInput: function () {
			this.$label.delay(150).fadeIn(70);

			this.$input.animate({
				width: 86
			}, 150);
		},

		_checkCode: function () {
			if (cartModel.isCouponCodeValid()) {
				notificationcenter.notify('views.store.tray.coupon.valid');
			} else {
				notificationcenter.notify('views.store.tray.coupon.invalid');
			}
		},

		_saveCode: function () {
			var orderModel = cartModel.get('orderModel'),
				couponCode = this.$input.val();

			orderModel.set('couponCode', couponCode);
		}

	});

	return FreeCookieView;

});