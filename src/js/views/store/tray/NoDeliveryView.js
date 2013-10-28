define(["jquery", "underscore", "backbone", "models/stateModel", "text!templates/store/tray/NoDeliveryTemplate.html"], function($, _, Backbone, stateModel, NoDeliveryTemplate) {
  var NoDeliveryView;
  return NoDeliveryView = Backbone.View.extend({
    template: _.template(NoDeliveryTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json, nextDayOfWeek, nextDeliveryTimeModel, storeModel;
      storeModel = stateModel.get("storeModel");
      nextDeliveryTimeModel = storeModel.getNextDeliveryTimeModel();
      nextDayOfWeek = nextDeliveryTimeModel.get("dayOfWeek");
      json = {
        nextDeliveryDay: this._getWeekDay(nextDayOfWeek),
        nextDeliveryTime: nextDeliveryTimeModel.getStartTime()
      };
      return this.$el.html(this.template(json));
    },
    _getWeekDay: function(dayOfWeek) {
      var weekdays;
      weekdays = {
        0: "Sonntag",
        1: "Montag",
        2: "Dienstag",
        3: "Mittwoch",
        4: "Donnerstag",
        5: "Freitag",
        6: "Samstag"
      };
      return weekdays[dayOfWeek];
    }
  });
});

/*
//@ sourceMappingURL=NoDeliveryView.js.map
*/