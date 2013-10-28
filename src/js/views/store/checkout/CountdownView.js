define(["jquery", "underscore", "backbone", "moment", "models/stateModel", "models/cartModel", "text!templates/store/checkout/CountdownTemplate.html"], function($, _, Backbone, moment, stateModel, cartModel, CountdownTemplate) {
  var CountdownView;
  return CountdownView = Backbone.View.extend({
    template: _.template(CountdownTemplate),
    countdownTimer: null,
    initialize: function() {
      this._render();
      return this._initializeCountdownTimer();
    },
    _initializeCountdownTimer: function() {
      var self;
      self = this;
      return this.countdownTimer = setInterval(function() {
        return self._render();
      }, 60000);
    },
    _render: function() {
      var currentMoment, customerAddressModel, dueDate, dueMoment, hours, json, minutes, orderModel, storeAddressModel, storeModel;
      orderModel = cartModel.get("orderModel");
      dueDate = orderModel.get("dueDate");
      dueMoment = moment(dueDate);
      currentMoment = moment();
      hours = dueMoment.diff(currentMoment, "hours");
      minutes = dueMoment.diff(currentMoment, "minutes") % 60;
      storeModel = stateModel.get("storeModel");
      storeAddressModel = storeModel.get("addressModel");
      customerAddressModel = cartModel.getCustomerAddressModel();
      json = {
        dueTime: dueMoment.format("HH:mm"),
        hours: this._padNumber(hours),
        minutes: this._padNumber(minutes),
        firstName: customerAddressModel.get("firstName"),
        street: customerAddressModel.get("street"),
        storePhone: storeAddressModel.get("phone")
      };
      return this.$el.html(this.template(json));
    },
    _padNumber: function(number) {
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    },
    destroy: function() {
      return clearInterval(this.countdownTimer);
    }
  });
});

/*
//@ sourceMappingURL=CountdownView.js.map
*/