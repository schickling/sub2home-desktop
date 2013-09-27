define([], function() {
  var DueDateCalculater;
  Date.prototype.addMinutes = function(minutes) {
    return this.setTime(new Date(this.getTime() + minutes * 60000));
  };
  Date.prototype.clone = function() {
    return new Date(this.getTime());
  };
  Date.prototype.getTotalMinutes = function() {
    return this.getHours() * 60 + this.getMinutes();
  };
  return DueDateCalculater = {
    getDueDate: function(deliveryTimesCollection, minimumDeliveryTime, dueDate, minutesToAdd) {
      var difference, nextDeliveryTimeModel;
      if (dueDate == null) {
        dueDate = new Date();
      }
      if (minutesToAdd == null) {
        minutesToAdd = 0;
      }
      dueDate = dueDate.clone();
      dueDate.addMinutes(minutesToAdd);
      nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel(dueDate);
      difference = Math.max(nextDeliveryTimeModel.get("startMinutes") - dueDate.getTotalMinutes(), minimumDeliveryTime);
      dueDate.addMinutes(difference);
      return dueDate;
    }
  };
});
