// Filename: src/js/views/store/dashboard/revenues/RevenueView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'notificationcenter',
    'text!templates/store/dashboard/revenues/RevenueTemplate.html'
    ], function ($, _, Backbone, moment, notificationcenter, RevenueTemplate) {

	"use strict";

	var RevenueView = Backbone.View.extend({

		template: _.template(RevenueTemplate),

		events: {
			'click i': '_download',
			'mouseenter i': '_showTooltip',
			'mouseleave i': '_hideTooltip',
			'mouseenter .bInvoiceCoin': '_tooltipForInvoice',
			'mouseenter .bInvoiceList': '_tooltipForAttachment',
			'mouseleave .iBtn': '_dismissTooltip',
		},

		className: 'turnover',

		isValidMonth: false,

		$download: null,

		initialize: function () {
			this._validateMonth();
			this._render();
			this._cacheDom();
		},

		_render: function () {

			var invoiceMoment = moment([this.model.getTimeSpanYear(), this.model.getTimeSpanMonth() - 1]), // - 1 because moment counts month from 0
				documentsPath = 'https://s3-eu-west-1.amazonaws.com/sub2home-data/documents/invoices/',
				json = {
					total: parseInt(this.model.get('total'), 10),
					month: invoiceMoment.format('MMM'),
					year: invoiceMoment.format('YYYY'),
					invoiceUrl: documentsPath + this.model.get('invoiceDocumentName'),
					attachmentUrl: documentsPath + this.model.get('attachmentDocumentName')
				};

			this.$el.html(this.template(json));
		},

		_cacheDom: function () {
			this.$download = this.$('i');
		},

		_validateMonth: function () {
			var now = new Date(),
				currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1;

			this.isValidMonth = (this.model.get('timeSpan') !== currentTotalNumberOfMonths);
		},

		_showTooltip: function () {

			if (this.isValidMonth) {

				var offset = this.$download.offset();
				notificationcenter.tooltip('views.store.dashboard.invoice.download', offset.top + 24, offset.left + 14);

			}
		},

		_hideTooltip: function () {

			if (this.isValidMonth) {

				notificationcenter.hideTooltip();

			}
		},

		_tooltipForInvoice: function () {
			var offset = this.$('.bInvoiceCoin').offset();
			notificationcenter.tooltip('views.store.dashboard.invoice.invoice', offset.top + 24, offset.left + 15);
		},

		_tooltipForAttachment: function () {
			var offset = this.$('.bInvoiceList').offset();
			notificationcenter.tooltip('views.store.dashboard.invoice.attachment', offset.top + 24, offset.left + 15);
		},

		_dismissTooltip: function () {
			notificationcenter.hideTooltip();
		}

	});

	return RevenueView;

});