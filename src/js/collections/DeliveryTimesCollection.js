(function() {
  define(["underscore", "backbone", "models/DeliveryTimeModel"], function(_, Backbone, DeliveryTimeModel) {
    "use strict";
    var DeliveryTimesCollection;
    DeliveryTimesCollection = Backbone.Collection.extend({
      model: DeliveryTimeModel,
      getNextDeliveryTimeModel: function() {
        var dayOfWeek, filteredDeliveryTimeModels, i, now, _i;
        now = new Date();
        dayOfWeek = now.getDay();
        filteredDeliveryTimeModels = void 0;
        for (i = _i = 0; _i <= 6; i = ++_i) {
          filteredDeliveryTimeModels = this._getFilteredDeliveryTimeModels(dayOfWeek, i === 0);
          if (filteredDeliveryTimeModels.length > 0) {
            return filteredDeliveryTimeModels[0];
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
            return deliveryTimeModel.get("dayOfWeek") === dayOfWeek && deliveryTimeModel.get("startMinutes") > totalMinutesOfNow;
          } else {
            return deliveryTimeModel.get("dayOfWeek") === dayOfWeek;
          }
        });
        return _.sortBy(filteredDeliveryTimeModels, function(deliveryTimeModel) {
          return deliveryTimeModel.get("startMinutes");
        });
      }
    });
    return DeliveryTimesCollection;
  });

}).call(this);
