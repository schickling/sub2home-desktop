// Filename: src/js/views/client/dashboard/RevenuesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'models/InvoiceModel',
    'views/client/dashboard/RevenueView',
    'text!templates/client/dashboard/RevenuesTemplate.html'
    ], function ($, _, Backbone, moment, InvoiceModel, RevenueView, RevenuesTemplate) {

	var RevenuesView = Backbone.View.extend({

		template: _.template(RevenuesTemplate),

		$clientRecentMonthlyRevenues: null,

		initialize: function () {
			this._render();
		},

		_render: function () {
			var currentMoment = moment();

			var json = {
				totalOfCurrentYear: parseInt(this._getTotalOfCurrentYear(), 10),
				totalOfCurrentMonth: parseInt(this._getTotalOfCurrentMonth(), 10),
				currentMonth: currentMoment.format('MMMM'),
				currentYear: currentMoment.format('YYYY'),
				currentYearShort: currentMoment.format('YY')
			};

			this.$el.html(this.template(json));

			this._cacheDom();

			this._renderRevenues();
		},

		_cacheDom: function () {
			this.$clientRecentMonthlyRevenues = this.$('#clientRecentMonthlyRevenues');
		},

		_renderRevenues: function () {

			var invoiceModels = this._getSummedUpInvoiceModels();

			_.each(invoiceModels, function (invoiceModel) {
				this._renderRevenue(invoiceModel);
			}, this);

		},

		_renderRevenue: function (invoiceModel) {

			var revenueView = new RevenueView({
				model: invoiceModel
			});

			this.$clientRecentMonthlyRevenues.append(revenueView.el);
		},

		_getTotalOfCurrentYear: function () {
			var totalOfCurrentYear = 0,
				invoicesCollection;

			_.each(this.collection.models, function (storeModel) {
				invoicesCollection = storeModel.get('invoicesCollection');
				totalOfCurrentYear += invoicesCollection.getTotalOfCurrentYear();
			});

			return totalOfCurrentYear;
		},

		_getTotalOfCurrentMonth: function () {
			var totalOfCurrentMonth = 0,
				invoicesCollection;

			_.each(this.collection.models, function (storeModel) {
				invoicesCollection = storeModel.get('invoicesCollection');
				totalOfCurrentMonth += invoicesCollection.getTotalOfCurrentMonth();
			});

			return totalOfCurrentMonth;
		},

		_getSummedUpInvoiceModels: function () {
			var invoiceModels = [],
				now = new Date(),
				currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1, // +1 since in js month numbers start with 0
				invoiceModel, totalNumberOfMonths, total, invoicesCollection, i;

			_.each(this.collection.models, function (storeModel) {
				totalNumberOfMonths = currentTotalNumberOfMonths;
				i = 0;

				while (true) {
					invoicesCollection = storeModel.get('invoicesCollection');
					total = invoicesCollection.getTotalOfMonthWithTotalNumber(totalNumberOfMonths);

					if (total === false) {
						break;
					}

					invoiceModel = invoiceModels[i];

					if (invoiceModel) {
						invoiceModel.set('total', invoiceModel.get('total') + total);
					} else {
						invoiceModels[i] = new InvoiceModel({
							total: total,
							timeSpan: totalNumberOfMonths
						});
					}

					totalNumberOfMonths--;
					i++;

				}

			}, this);

			return invoiceModels;
		}


	});

	return RevenuesView;

});