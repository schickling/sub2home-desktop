define(["jquery", "underscore", "backbone", "services/notificationcenter", "models/DeliveryTimeModel", "collections/DeliveryTimesCollection", "views/store/config/DeliveryTimeView"], function($, _, Backbone, notificationcenter, DeliveryTimeModel, DeliveryTimesCollection, DeliveryTimeView) {
  var DeliveryTimesView;
  return DeliveryTimesView = Backbone.View.extend({
    events: {
      "click .bAdd": "_addDeliveryTime"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(deliveryTimeModel) {
        return this._renderDeliveryTime(deliveryTimeModel);
      }), this);
    },
    _renderDeliveryTime: function(deliveryTimeModel) {
      var $matchingBusinessDay, $openingHours, deliveryTimeView;
      deliveryTimeView = new DeliveryTimeView({
        model: deliveryTimeModel
      });
      $matchingBusinessDay = this.$(".businessDay[data-day=\"" + deliveryTimeModel.get("dayOfWeek") + "\"]");
      $openingHours = $matchingBusinessDay.find(".openingHours");
      return $openingHours.append(deliveryTimeView.el);
    },
    _addDeliveryTime: function(e) {
      var dayOfWeek, self;
      dayOfWeek = $(e.target).parents(".businessDay").first().attr("data-day");
      self = this;
      return this.collection.create({
        dayOfWeek: dayOfWeek
      }, {
        validate: false,
        success: function(deliveryTimeModel) {
          notificationcenter.notify("views.store.config.deliveryTime.add.success");
          return self._renderDeliveryTime(deliveryTimeModel);
        },
        error: function() {
          return notificationcenter.notify("views.store.config.deliveryTime.add.error");
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=DeliveryTimesView.js.map
*/