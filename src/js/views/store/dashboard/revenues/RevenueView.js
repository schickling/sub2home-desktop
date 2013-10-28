define(["jquery", "underscore", "backbone", "moment", "services/notificationcenter", "text!templates/store/dashboard/revenues/RevenueTemplate.html"], function($, _, Backbone, moment, notificationcenter, RevenueTemplate) {
  var RevenueView;
  return RevenueView = Backbone.View.extend({
    template: _.template(RevenueTemplate),
    events: {
      "click i": "_download",
      "mouseenter i": "_showTooltip",
      "mouseleave i": "_hideTooltip",
      "mouseenter .bInvoiceCoin": "_tooltipForInvoice",
      "mouseenter .bInvoiceList": "_tooltipForAttachment",
      "mouseleave .iBtn": "_dismissTooltip"
    },
    className: "turnover",
    isValidMonth: false,
    $download: null,
    initialize: function() {
      this._validateMonth();
      this._render();
      return this._cacheDom();
    },
    _render: function() {
      var documentsPath, invoiceMoment, json;
      invoiceMoment = moment([this.model.getTimeSpanYear(), this.model.getTimeSpanMonth() - 1]);
      documentsPath = "https://s3-eu-west-1.amazonaws.com/sub2home-data/documents/invoices/";
      json = {
        total: parseInt(this.model.get("total"), 10),
        month: invoiceMoment.format("MMM"),
        year: invoiceMoment.format("YYYY"),
        invoiceUrl: documentsPath + this.model.get("invoiceDocumentName"),
        attachmentUrl: documentsPath + this.model.get("attachmentDocumentName")
      };
      return this.$el.html(this.template(json));
    },
    _cacheDom: function() {
      return this.$download = this.$("i");
    },
    _validateMonth: function() {
      var currentTotalNumberOfMonths, now;
      now = new Date();
      currentTotalNumberOfMonths = now.getFullYear() * 12 + now.getMonth() + 1;
      return this.isValidMonth = this.model.get("timeSpan") !== currentTotalNumberOfMonths;
    },
    _showTooltip: function() {
      var offset;
      if (this.isValidMonth) {
        offset = this.$download.offset();
        return notificationcenter.tooltip("views.store.dashboard.invoice.download", offset.top + 24, offset.left + 14);
      }
    },
    _hideTooltip: function() {
      if (this.isValidMonth) {
        return notificationcenter.hideTooltip();
      }
    },
    _tooltipForInvoice: function() {
      var offset;
      offset = this.$(".bInvoiceCoin").offset();
      return notificationcenter.tooltip("views.store.dashboard.invoice.invoice", offset.top + 24, offset.left + 15);
    },
    _tooltipForAttachment: function() {
      var offset;
      offset = this.$(".bInvoiceList").offset();
      return notificationcenter.tooltip("views.store.dashboard.invoice.attachment", offset.top + 24, offset.left + 15);
    },
    _dismissTooltip: function() {
      return notificationcenter.hideTooltip();
    }
  });
});

/*
//@ sourceMappingURL=RevenueView.js.map
*/