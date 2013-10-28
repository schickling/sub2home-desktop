define(["jquery", "underscore", "backbone", "views/store/dashboard/revenues/RevenueView", "text!templates/store/dashboard/revenues/RevenuesYearTemplate.html"], function($, _, Backbone, RevenueView, RevenuesYearTemplate) {
  var RevenuesYearView;
  return RevenuesYearView = Backbone.View.extend({
    template: _.template(RevenuesYearTemplate),
    className: "turnoverYear",
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var currentYear, invoiceYear, json;
      currentYear = new Date().getFullYear();
      invoiceYear = this.collection.first().getTimeSpanYear();
      if (invoiceYear < currentYear) {
        json = {
          total: parseInt(this.collection.getTotal(), 10),
          year: invoiceYear
        };
        this.$el.html(this.template(json));
      }
      return this._renderRevenues();
    },
    _renderRevenues: function() {
      return _.each(this.collection.models, (function(invoiceModel) {
        return this._renderRevenue(invoiceModel);
      }), this);
    },
    _renderRevenue: function(invoiceModel) {
      var revenueView;
      revenueView = new RevenueView({
        model: invoiceModel
      });
      return this.$el.prepend(revenueView.el);
    }
  });
});

/*
//@ sourceMappingURL=RevenuesYearView.js.map
*/