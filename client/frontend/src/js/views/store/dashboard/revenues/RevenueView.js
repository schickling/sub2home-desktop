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
			'mouseenter': '_tooltip'
		},

		className: 'turnover',

		initialize: function () {
			this._render();
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

		_download: function () {
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

		},

		_fileExists: function (url) {

			var http = new XMLHttpRequest();

			http.open('HEAD', url, false);
			http.send();

			return http.status != 404;

		},

		_tooltip: function() {
			notificationcenter.tooltip('jo', 10, 10);
		}

	});

	return RevenueView;

});