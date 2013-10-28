define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var DeliveryTimesView;
  return DeliveryTimesView = Backbone.View.extend({
    initialize: function() {
      this._render();
      return this._markClosedDeliveryTimes();
    },
    _render: function() {
      return _.each(this.collection.models, (function(deliveryTimeModel) {
        return this._renderDeliveryTime(deliveryTimeModel);
      }), this);
    },
    _renderDeliveryTime: function(deliveryTimeModel) {
      var $deliveryTime, $openingHours, $weekday, endTime, startTime;
      $weekday = this.$(".weekday[data-day=\"" + deliveryTimeModel.get("dayOfWeek") + "\"]");
      $openingHours = $weekday.find(".openingHours");
      startTime = deliveryTimeModel.getStartTime();
      endTime = deliveryTimeModel.getEndTime();
      $deliveryTime = $("<div>", {
        text: startTime + " - " + endTime
      });
      return $openingHours.append($deliveryTime);
    },
    _markClosedDeliveryTimes: function() {
      var $closed, $openingHours, $weekdays;
      $weekdays = this.$(".weekday");
      $closed = $("<div>Geschlossen</div>");
      $openingHours = void 0;
      return $weekdays.each(function() {
        $openingHours = $(this).find(".openingHours");
        if ($openingHours.is(":empty")) {
          return $openingHours.append($closed.clone());
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=DeliveryTimesView.js.map
*/