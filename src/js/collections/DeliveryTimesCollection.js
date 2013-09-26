define(["underscore", "backbone", "models/DeliveryTimeModel"], function(_, Backbone, DeliveryTimeModel) {
  var DeliveryTimesCollection;
  return DeliveryTimesCollection = Backbone.Collection.extend({
    model: DeliveryTimeModel,
    getNextDeliveryTimeModel: function(skip) {
      var dayOfWeek, filteredDeliveryTimeModels, i, now, _i;
      if (skip == null) {
        skip = 0;
      }
      now = new Date();
      dayOfWeek = now.getDay();
      for (i = _i = 0; _i <= 6; i = ++_i) {
        filteredDeliveryTimeModels = this._getFilteredDeliveryTimeModels(dayOfWeek, i === 0);
        if (skip < filteredDeliveryTimeModels.length) {
          return filteredDeliveryTimeModels[skip];
        } else {
          skip -= filteredDeliveryTimeModels.length;
        }
        dayOfWeek = (dayOfWeek + 1) % 7;
      }
    },
    _getFilteredDeliveryTimeModels: function(dayOfWeek, shouldRespectStartTime) {
      var filteredDeliveryTimeModels, now, totalMinutesOfNow;
      now = new Date();
      totalMinutesOfNow = now.getMinutes() + now.getHours() * 60;
      filteredDeliveryTimeModels = this.filter(function(deliveryTimeModel) {
        if (shouldRespectStartTime) {
          return deliveryTimeModel.get("dayOfWeek") === dayOfWeek && deliveryTimeModel.get("endMinutes") > totalMinutesOfNow;
        } else {
          return deliveryTimeModel.get("dayOfWeek") === dayOfWeek;
        }
      });
      return _.sortBy(filteredDeliveryTimeModels, function(deliveryTimeModel) {
        return deliveryTimeModel.get("startMinutes");
      });
    }
  });
});
