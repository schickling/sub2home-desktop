define(["underscore", "backbone", "services/notificationcenter"], function(_, Backbone, notificationcenter) {
  var DeliveryTimeModel;
  return DeliveryTimeModel = Backbone.Model.extend({
    defaults: {
      dayOfWeek: 0,
      startMinutes: 0,
      endMinutes: 60
    },
    urlRoot: function() {
      if (this.isNew()) {
        return "stores/storeAlias/deliverytimes";
      } else {
        return "deliverytimes";
      }
    },
    initialize: function() {
      return this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.deliveryTimeModel.invalid", {
          error: error
        });
      });
    },
    checkIfNow: function() {
      var currentMinutes, date, dayOfWeek;
      date = new Date();
      dayOfWeek = date.getDay();
      currentMinutes = date.getMinutes() + date.getHours() * 60;
      if (dayOfWeek !== this.get("dayOfWeek") || currentMinutes < this.get("startMinutes") || currentMinutes > this.get("endMinutes")) {
        return false;
      } else {
        return true;
      }
    },
    validate: function(attributes) {
      var endMinutes, startMinutes;
      startMinutes = attributes.startMinutes;
      if (typeof startMinutes !== "number" || startMinutes !== parseInt(startMinutes, 10)) {
        return "startMinutes has to be numeric";
      }
      if (startMinutes < 0) {
        return "startMinutes can't be negative";
      }
      endMinutes = attributes.endMinutes;
      if (typeof endMinutes !== "number" || endMinutes !== parseInt(endMinutes, 10)) {
        return "endMinutes has to be numeric";
      }
      if (endMinutes < 0) {
        return "endMinutes can't be negative";
      }
      if (endMinutes <= startMinutes) {
        return "endMinutes must be less then startMinutes";
      }
    },
    _renderTime: function(totalMinutes) {
      var hours, minutes;
      hours = parseInt(totalMinutes / 60, 10);
      minutes = totalMinutes % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    getStartTime: function() {
      return this._renderTime(this.get("startMinutes"));
    },
    getEndTime: function() {
      return this._renderTime(this.get("endMinutes"));
    }
  });
});

/*
//@ sourceMappingURL=DeliveryTimeModel.js.map
*/