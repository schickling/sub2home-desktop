define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/store/config/DeliveryTimeTemplate.html"], function($, _, Backbone, notificationcenter, DeliveryTimeTemplate) {
  var DeliveryTimeView;
  return DeliveryTimeView = Backbone.View.extend({
    className: "deliveryTime",
    template: _.template(DeliveryTimeTemplate),
    events: {
      "focusout .deliveryTimeStartMinutes": "_updateStartMinutes",
      "focusout .deliveryTimeEndMinutes": "_updateEndMinutes",
      "keypress input": "_blurOnEnter",
      "click .bRemove": "_destroy"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        startTime: this.model.getStartTime(),
        endTime: this.model.getEndTime()
      };
      return this.$el.html(this.template(json));
    },
    _destroy: function() {
      var self;
      self = this;
      return this.$el.fadeOut(function() {
        self.model.destroy();
        return self.remove();
      });
    },
    _updateStartMinutes: function(e) {
      var $input, time;
      $input = this.$(".deliveryTimeStartMinutes");
      time = $input.val();
      if (this._checkTimeFormat(time)) {
        return this._updateModel({
          startMinutes: this._parseTime(time)
        });
      } else {
        return this._render();
      }
    },
    _updateEndMinutes: function(e) {
      var $input, time;
      $input = this.$(".deliveryTimeEndMinutes");
      time = $input.val();
      if (this._checkTimeFormat(time)) {
        return this._updateModel({
          endMinutes: this._parseTime(time)
        });
      } else {
        return this._render();
      }
    },
    _updateModel: function(changedAttributes) {
      var self;
      self = this;
      return this.model.save(changedAttributes, {
        validate: true,
        success: function() {
          return notificationcenter.notify("views.store.config.deliveryTime.change.success");
        },
        error: function() {
          notificationcenter.notify("views.store.config.deliveryTime.change.error");
          return self._render();
        }
      });
    },
    _checkTimeFormat: function(time) {
      if (time.match(/^((([01]?[0-9]|2[0-3]):[0-5][0-9])|24:00)$/)) {
        return true;
      } else {
        notificationcenter.notify("views.store.config.deliveryTime.wrongTimeFormat");
        return false;
      }
    },
    _parseTime: function(time) {
      var parts;
      parts = time.split(":");
      return parts[0] * 60 + parts[1] * 1;
    },
    _blurOnEnter: function(e) {
      var $input;
      if (e.keyCode !== 13) {
        return;
      }
      $input = $(e.target);
      return $input.blur();
    }
  });
});

/*
//@ sourceMappingURL=DeliveryTimeView.js.map
*/