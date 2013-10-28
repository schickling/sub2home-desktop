define(["jquery", "underscore", "backbone", "moment", "services/notificationcenter", "views/store/dashboard/details/OrderDetailsView", "text!templates/store/dashboard/OrderTemplate.html"], function($, _, Backbone, moment, notificationcenter, OrderDetailsView, OrderTemplate) {
  var OrderView;
  return OrderView = Backbone.View.extend({
    template: _.template(OrderTemplate),
    className: "order",
    events: {
      "click .orderStatus": "_toggleIsDelivered",
      "click .resendmail": "_resendMail",
      "click .alertOrder": "_addCredit",
      "mouseenter .bMail": "_showResendMailTooltip",
      "mouseleave .bMail": "_dismissTooltip"
    },
    creditView: null,
    initialize: function() {
      this.creditView = this.options.creditView;
      this._render();
      return this.listenTo(this.model, "change", this._render);
    },
    _render: function() {
      var addressModel, createdDate, createdMoment, dateOrTime, dueDate, dueMoment, dueTime, json, orderModel, total, totalWithCredit;
      orderModel = this.model;
      addressModel = orderModel.get("addressModel");
      dueDate = orderModel.get("dueDate");
      createdDate = orderModel.get("createdDate");
      createdMoment = moment(createdDate);
      dueMoment = moment(dueDate);
      dueTime = dueMoment.format("HH:mm");
      dateOrTime = this._getDateOrTime();
      total = orderModel.get("total");
      totalWithCredit = this._getTotalWithCredit();
      json = {
        number: orderModel.getNumber(),
        paymentMethodClass: this._getPaymentMethodClass(),
        total: total,
        totalWithCredit: totalWithCredit,
        postal: addressModel.get("postal"),
        city: addressModel.get("city"),
        district: addressModel.get("district"),
        dueTime: dueTime,
        dateOrTime: dateOrTime,
        isDelivered: orderModel.get("isDelivered"),
        hasCredit: orderModel.hasCredit()
      };
      this.$el.html(this.template(json));
      if (totalWithCredit < total) {
        return this.$el.addClass("balanced");
      }
    },
    _toggleDetailsView: function() {
      var $orderContent;
      $orderContent = this.$(".orderContent");
      if (!$orderContent.html().trim()) {
        this._renderDetailsView();
      }
      return $orderContent.toggle();
    },
    _renderDetailsView: function() {
      this.model.fetch({
        async: false
      });
      return new OrderDetailsView({
        el: this.$(".orderContent"),
        model: this.model
      });
    },
    _getDateOrTime: function() {
      var createdDate, createdMoment;
      createdDate = this.model.get("createdDate");
      createdMoment = moment(createdDate);
      if (this.model.wasCreatedToday()) {
        return createdMoment.format("HH:mm");
      } else {
        return createdMoment.format("DD.MM.YYYY");
      }
    },
    _getPaymentMethodClass: function() {
      var paymentMethod, paymentMethodClass;
      paymentMethod = this.model.get("paymentMethod");
      paymentMethodClass = void 0;
      switch (paymentMethod) {
        case "paypal":
          paymentMethodClass = "bPaypal";
          break;
        case "cash":
          paymentMethodClass = "bCash";
          break;
        case "ec":
          paymentMethodClass = "bEC";
      }
      return paymentMethodClass;
    },
    _toggleIsDelivered: function() {
      var $isDelivered, isDelivered;
      isDelivered = !this.model.get("isDelivered");
      $isDelivered = this.$(".orderStatus");
      this.model.save({
        isDelivered: isDelivered
      }, {
        success: function() {
          return $isDelivered.toggleClass("delivered", isDelivered);
        }
      });
      return false;
    },
    _resendMail: function() {
      var url;
      url = this.model.url() + "/resendmail";
      $.ajax({
        url: url,
        type: "post",
        success: function() {
          return notificationcenter.notify("views.store.dashboard.resendMail.success");
        },
        error: function() {
          return notificationcenter.notify("views.store.dashboard.resendMail.error");
        }
      });
      return false;
    },
    _showResendMailTooltip: function(e) {
      var $button, offset;
      $button = $(e.target);
      offset = $button.offset();
      return notificationcenter.tooltip("views.store.dashboard.resendMail", offset.top + 23, offset.left - 84);
    },
    _dismissTooltip: function() {
      return notificationcenter.hideTooltip();
    },
    _addCredit: function() {
      if (!this.model.get("creditModel")) {
        this.creditView.createForOrder(this.model);
        return false;
      }
    },
    _getTotalWithCredit: function() {
      var creditModel, totalWithCredit;
      totalWithCredit = this.model.get("total");
      creditModel = this.model.get("creditModel");
      if (creditModel && creditModel.get("isAccepted")) {
        totalWithCredit -= creditModel.get("total");
      }
      return totalWithCredit;
    }
  });
});

/*
//@ sourceMappingURL=OrderView.js.map
*/