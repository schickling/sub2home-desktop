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
      if (dueDate == null) {
        dueDate = new Date();
      }
      if (minutesToAdd == null) {
        minutesToAdd = 0;
      }
      this.now = new Date();
      this.dueDate = dueDate > this.now ? dueDate.clone() : this.now.clone();
      this.dueDate.addMinutes(minutesToAdd);
      this.minimumDeliveryTime = minimumDeliveryTime;
      this.nextDeliveryTimeModel = deliveryTimesCollection.getNextDeliveryTimeModel(this.now);
      if (this._endMinutesExceeded()) {
        return null;
      }
      if (minutesToAdd < 0) {
        if (!(this._startMinutesReached() && this._minimumReached())) {
          return null;
        }
      } else {
        if (!this._startMinutesReached()) {
          this._jumpToBorder();
        }
        if (!this._minimumReached()) {
          this._increase();
        }
      }
      this._roundUp();
      return this.dueDate;
    },
    _startMinutesReached: function() {
      return this.dueDate.getTotalMinutes() >= this.nextDeliveryTimeModel.get("startMinutes");
    },
    _endMinutesExceeded: function() {
      return this.dueDate.getTotalMinutes() > this.nextDeliveryTimeModel.get("endMinutes") + this.minimumDeliveryTime;
    },
    _minimumReached: function() {
      return this.dueDate.getTotalMinutes() >= this.now.getTotalMinutes() + this.minimumDeliveryTime;
    },
    _jumpToBorder: function() {
      this.dueDate.setHours(parseInt(this.nextDeliveryTimeModel.get("startMinutes") / 60, 10));
      return this.dueDate.setMinutes(this.nextDeliveryTimeModel.get("startMinutes") % 60);
    },
    _increase: function() {
      var minimumToAdd;
      minimumToAdd = this.minimumDeliveryTime - this.dueDate.getTotalMinutes() + this.now.getTotalMinutes();
      return this.dueDate.addMinutes(minimumToAdd);
    },
    _roundUp: function() {
      return this.dueDate.addMinutes((5 - (this.dueDate.getMinutes() % 5)) % 5);
    }
  };
});

/*
//@ sourceMappingURL=dueDateCalculater.js.map
*/