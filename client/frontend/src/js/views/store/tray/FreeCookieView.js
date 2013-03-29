// Filename: src/js/views/store/tray/FreeCookieView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/FreeCookieTemplate.html'
    ], function ($, _, Backbone, notificationcenter, cartModel, FreeCookieTemplate) {

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

			if (couponCode) {
				this.$el.addClass('hasCode');
			}

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

		// 10-41786-0-0329-0609
		_checkCode: function () {
			var code = this.$input.val(),
				regex = /^(\d){2}-(\d){5}-(\d)-(\d){4}-(\d){4}$/,
				codeIsValid = regex.test(code);

			if (codeIsValid) {
				notificationcenter.notify('views.store.tray.coupon.valid');
				this._saveCode();
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