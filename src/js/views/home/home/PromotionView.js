// Filename: src/js/views/home/home/PromotionView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'modules/postalOracle',
    'text!templates/home/home/PromotionTemplate.html'
    ], function ($, _, Backbone, notificationcenter, postalOracle, PromotionTemplate) {

	"use strict";

	var PromotionView = Backbone.View.extend({

		events: {
			'click #submitStoreSuggestion': '_submit'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(PromotionTemplate);
		},

		show: function () {
			this.$el.fadeIn();
		},

		hide: function () {
			this.$el.fadeOut();
		},

		_submit: function () {
			var input = this.$('#suggestStoreMessage').val(),
				postal = postalOracle.getPostal(),
				text = 'Message: ' + input + '\nPostal' + postal,
				self = this;

			$.ajax({
				url: 'services/promotion',
				data: JSON.stringify({
					text: text
				}),
				type: 'post',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (response) {
					self.hide();
					notificationcenter.notify('views.home.home.promotion.success');
				},
				error: function () {
					notificationcenter.notify('views.home.home.promotion.error');
				}
			});
		}

	});

	return PromotionView;

});