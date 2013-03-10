// Filename: src/js/views/store/dashboard/revenues/RevenueView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'notificationcenter',
    'text!templates/store/dashboard/revenues/RevenueTemplate.html'
    ], function ($, _, Backbone, moment, notificationcenter, RevenueTemplate) {

	var RevenueView = Backbone.View.extend({

		template: _.template(RevenueTemplate),

		events: {
			'click i': '_download',
			'mouseenter i': '_showTooltip',
			'mouseleave i': '_hideTooltip'
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

			var invoiceMoment = moment([this.model.getTimeSpanYear(), this.model.getTimeSpanMonth() - 1]); // - 1 because moment counts month from 0

			var json = {
				total: parseInt(this.model.get('total'), 10),
				month: invoiceMoment.format('MMM'),
				year: invoiceMoment.format('YYYY')
			};

			this.$el.html(this.template(json));
		},

		_cacheDom: function() {
			this.$download = this.$('i');
		},

		_validateMonth: function () {
			var now = new Date(),
				currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1;

			this.isValidMonth = (this.model.get('timeSpan') !== currentTotalNumberOfMonths);
		},

		_download: function () {

			if (this.isValidMonth) {

				var path = '/files/invoices/',
					self = this,
					invoiceFile = path + this.model.get('invoiceDocumentName'),
					attachmentFile = path + this.model.get('attachmentDocumentName');

				if (this._fileExists(invoiceFile)) {
					window.location.href = invoiceFile;
				}

				// wait until first file downloaded
				setTimeout(function () {
					if (self._fileExists(attachmentFile)) {
						window.location.href = attachmentFile;
					}
				}, 2000);

			}

		},

		_fileExists: function (url) {

			var http = new XMLHttpRequest();

			http.open('HEAD', url, false);
			http.send();

			return http.status != 404;

		},

		_showTooltip: function () {

			if (this.isValidMonth) {

				var offset = this.$download.offset();
				notificationcenter.tooltip('store.dashboard.invoice.download', offset.top + 24, offset.left + 14);

			}
		},

		_hideTooltip: function () {

			if (this.isValidMonth) {

				notificationcenter.hideTooltip();

			}
		}

	});

	return RevenueView;

});