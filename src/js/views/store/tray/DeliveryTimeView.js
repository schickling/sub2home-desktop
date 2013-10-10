define(["jquery", "underscore", "backbone", "moment", "services/notificationcenter", "services/dueDateCalculater", "models/cartModel", "models/stateModel", "text!templates/store/tray/DeliveryTimeTemplate.html"], function($, _, Backbone, moment, notificationcenter, dueDateCalculater, cartModel, stateModel, DeliveryTimeTemplate) {
  var DeliveryTimeView;
  return DeliveryTimeView = Backbone.View.extend({
    template: _.template(DeliveryTimeTemplate),
    events: {
      "click #hours .iArrowUp.active, #hours .topTile": "_addHour",
      "click #hours .iArrowDown.active, #hours .bottomTile": "_substractHour",
      "click #minutes .iArrowUp.active, #minutes .topTile": "_addFiveMinutes",
      "click #minutes .iArrowDown.active, #minutes .bottomTile": "_substractFiveMinutes"
    },
    intervalTimer: null,
    initialize: function() {
      this._fixDueDate();
      this._render();
      return this._initializeIntervalTimer();
    },
    _fixDueDate: function() {
      var orderModel;
      orderModel = cartModel.get("orderModel");
      return orderModel.set("dueDate", this._getValidDueDate());
    },
    _render: function() {
      var dueMoment, json;
      dueMoment = moment(this._getValidDueDate());
      json = {
        hoursAreMinimum: !this._isValidDueDateChange(-60),
        minutesAreMinimum: !this._isValidDueDateChange(-5),
        hoursAreMaximum: !this._isValidDueDateChange(60),
        minutesAreMaximum: !this._isValidDueDateChange(5),
        dueHours: dueMoment.format("HH"),
        dueMinutes: dueMoment.format("mm"),
        minimumDuration: cartModel.getMinimumDuration()
      };
      return this.$el.html(this.template(json));
    },
    _initializeIntervalTimer: function() {
      var _this = this;
      return this.intervalTimer = setInterval(function() {
        _this._fixDueDate();
        return _this._render();
      }, 60000);
    },
    _addHour: function() {
      return this._addMinutesToDueDate(60);
    },
    _substractHour: function() {
      return this._addMinutesToDueDate(-60);
    },
    _addFiveMinutes: function() {
      return this._addMinutesToDueDate(5);
    },
    _substractFiveMinutes: function() {
      return this._addMinutesToDueDate(-5);
    },
    _isValidDueDateChange: function(minutesToAdd) {
      return this._getValidDueDate(minutesToAdd) !== null;
    },
    _addMinutesToDueDate: function(minutesToAdd) {
      var dueDate, orderModel;
      dueDate = this._getValidDueDate(minutesToAdd);
      if (dueDate !== null) {
        orderModel = cartModel.get("orderModel");
        orderModel.set("dueDate", dueDate);
        return this._render();
      }
    },
    _getValidDueDate: function(minutesToAdd) {
      var deliveryTimesCollection, dueDate, minimumDuration, orderModel, storeModel;
      if (minutesToAdd == null) {
        minutesToAdd = 0;
      }
      storeModel = stateModel.get("storeModel");
      deliveryTimesCollection = storeModel.get("deliveryTimesCollection");
      minimumDuration = storeModel.getMinimumDuration();
      orderModel = cartModel.get("orderModel");
      dueDate = orderModel.get("dueDate");
      return dueDateCalculater.getDueDate(deliveryTimesCollection, minimumDuration, dueDate, minutesToAdd);
    },
    destroy: function() {
      return clearInterval(this.intervalTimer);
    }
  });
});
