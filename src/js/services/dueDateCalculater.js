define(["underscore"], function(_) {
  var DueDateCalculater;
  return DueDateCalculater = {
    getDueDate: function(deliveryTimesCollection, minimumDeliveryTime, dueDate, minutesToAdd) {
      var nextDayOfWeek, nextDeliveryTimeModel;
      if (dueDate == null) {
        dueDate = new Date();
      }
      if (minutesToAdd == null) {
        minutesToAdd = 0;
      }
      this.dueDate = dueDate;
      if (this._isNow) {
        this._addMinutes(minimumDeliveryTime);
      } else {
        this._addMinutes(minutesToAdd);
      }
      nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel();
      if (!this._isBetween(nextDeliveryTimeModel.get("startMinutes", nextDeliveryTimeModel.get("endMinutes")))) {
        nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel(1);
        if (nextDayOfWeek = nextDeliveryTimeModel.get("dayOfWeek" !== this.dueDate.getDay())) {
          1;
        }
        this.dueDate.setHours = parseInt(nextDeliveryTimeModel.get("startMinutes") / 60, 10);
        this.dueDate.setMinutes = nextDeliveryTimeModel.get("startMinutes" % 60);
      }
      return this.dueDate;
    },
    _isNow: function() {
      return this.dueDate.toTimeString() === new Date().toTimeString();
    },
    _addMinutes: function(minutes) {
      return this.dueDate = new Date(this.dueDate.getTime() + minutes * 60000);
    },
    _isBetween: function(startMinutes, endMinutes) {
      var _ref;
      return (startMinutes <= (_ref = this.dueDate.getMinutes() + this.dueDate.getHours() * 60) && _ref <= endMinutes);
    }
  };
});
