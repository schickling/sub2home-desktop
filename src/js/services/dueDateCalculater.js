define(["underscore"], function(_) {
  var DueDateCalculater;
  return DueDateCalculater = {
    getDueDate: function(deliveryTimesCollection, minimumDeliveryTime, dueDate, minutesToAdd) {
      if (dueDate == null) {
        dueDate = new Date();
      }
      if (minutesToAdd == null) {
        minutesToAdd = 0;
      }
      return dueDate;
    }
  };
});
