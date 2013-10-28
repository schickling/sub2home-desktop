define(["jquery", "underscore", "backbone", "services/notificationcenter", "models/CreditModel", "text!templates/store/dashboard/CreditTemplate.html"], function($, _, Backbone, notificationcenter, CreditModel, CreditTemplate) {
  var CreditView;
  return CreditView = Backbone.View.extend({
    template: _.template(CreditTemplate),
    events: {
      "click #cancelBalanceOrder": "_close",
      "click #submitBalanceOrder": "_create"
    },
    orderModel: null,
    createForOrder: function(orderModel) {
      this.orderModel = orderModel;
      this.model = new CreditModel({
        total: orderModel.get("total")
      });
      this._render();
      return this._show();
    },
    _render: function() {
      var json;
      json = {
        orderNumber: this.orderModel.getNumber(),
        total: this.model.get("total")
      };
      return this.$el.html(this.template(json));
    },
    _show: function() {
      this.$el.fadeIn();
      return this.$("#balanceOrderMessage").focus();
    },
    _close: function() {
      return this.$el.fadeOut();
    },
    _create: function() {
      var description, self, total;
      self = this;
      total = this.$("#balanceOrderValueInput").val();
      description = this.$("#balanceOrderMessage").val();
      if (!description) {
        notificationcenter.notify("views.store.dashboard.credit.noDescription");
        return;
      }
      if (total > this.orderModel.get("total")) {
        notificationcenter.notify("views.store.dashboard.credit.tooMuchTotal");
        return;
      }
      if (total <= 0) {
        notificationcenter.notify("views.store.dashboard.credit.tooLessTotal");
        return;
      }
      return this.model.save({
        total: total,
        description: description
      }, {
        url: "orders/" + self.orderModel.get("id") + "/credits",
        success: function() {
          notificationcenter.notify("views.store.dashboard.credit.success");
          self.orderModel.set("creditModel", self.model);
          return self._close();
        },
        error: function() {
          return notificationcenter.notify("views.store.dashboard.credit.error");
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=CreditView.js.map
*/