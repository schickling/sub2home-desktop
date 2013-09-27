define(["underscore", "backbone", "models/DeliveryTimeModel"], function(_, Backbone, DeliveryTimeModel) {
  var DeliveryTimesCollection;
  return DeliveryTimesCollection = Backbone.Collection.extend({
    model: DeliveryTimeModel,
    getNextDeliveryTimeModel: function(date) {
      var dayOfWeek, filteredDeliveryTimeModels, i, totalMinutes, _i;
      if (date == null) {
        date = new Date();
      }
      dayOfWeek = date.getDay();
      totalMinutes = date.getMinutes() + date.getHours() * 60;
      for (i = _i = 0; _i <= 6; i = ++_i) {
        filteredDeliveryTimeModels = this._getFilteredDeliveryTimeModels(totalMinutes, dayOfWeek, i === 0);
        if (filteredDeliveryTimeModels.length > 0) {
          return filteredDeliveryTimeModels[0];
        }
        dayOfWeek = (dayOfWeek + 1) % 7;
      }
      return false;
    },
    _getFilteredDeliveryTimeModels: function(totalMinutes, dayOfWeek, shouldRespectStartTime) {
      var filteredDeliveryTimeModels;
      filteredDeliveryTimeModels = this.filter(function(deliveryTimeModel) {
        return deliveryTimeModel.get("dayOfWeek") === dayOfWeek && (shouldRespectStartTime && deliveryTimeModel.get("endMinutes") >= totalMinutes || !shouldRespectStartTime);
      });
      return _.sortBy(filteredDeliveryTimeModels, function(deliveryTimeModel) {
        return deliveryTimeModel.get("startMinutes");
      });
    }
  });
});
