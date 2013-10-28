define(["jquery", "underscore", "backbone", "moment", "text!templates/client/dashboard/RevenueTemplate.html"], function($, _, Backbone, moment, RevenueTemplate) {
  var RevenueView;
  return RevenueView = Backbone.View.extend({
    template: _.template(RevenueTemplate),
    className: "clientMonthlyTurnover",
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var invoiceMoment, json;
      invoiceMoment = moment([this.model.getTimeSpanYear(), this.model.getTimeSpanMonth() - 1]);
      json = {
        total: parseInt(this.model.get("total"), 10),
        month: invoiceMoment.format("MMM"),
        year: invoiceMoment.format("YYYY")
      };
      return this.$el.html(this.template(json));
    }
  });
});

/*
//@ sourceMappingURL=RevenueView.js.map
*/