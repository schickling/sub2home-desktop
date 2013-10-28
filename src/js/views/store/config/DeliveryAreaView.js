define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/store/config/DeliveryAreaTemplate.html"], function($, _, Backbone, notificationcenter, DeliveryAreaTemplate) {
  var DeliveryAreaView;
  return DeliveryAreaView = Backbone.View.extend({
    events: {
      "focusout .deliveryAreaMinimumDuration": "_updateMinimumDuration",
      "focusout .deliveryAreaMinimumValue": "_updateMinimumValue",
      "focusout .deliveryAreaPostal": "_updatePostal",
      "focusout .deliveryAreaCity": "_updateCity",
      "focusout .deliveryAreaDistrict": "_updateDistrict",
      "keypress input": "_blurOnEnter",
      "click .bRemove": "_destroy"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return this.$el.html(_.template(DeliveryAreaTemplate, this.model.toJSON()));
    },
    _destroy: function() {
      var self;
      self = this;
      return this.model.destroy({
        success: function() {
          return self.$el.fadeOut(function() {
            return self.remove();
          });
        }
      });
    },
    _updateMinimumDuration: function() {
      var $input, minimumDuration;
      $input = this.$(".deliveryAreaMinimumDuration");
      minimumDuration = parseInt($input.val(), 10);
      return this._updateModel({
        minimumDuration: minimumDuration
      });
    },
    _updateMinimumValue: function() {
      var $input, minimumValue;
      $input = this.$(".deliveryAreaMinimumValue");
      minimumValue = parseFloat($input.val());
      this._updateModel({
        minimumValue: minimumValue
      });
      return $input.val(minimumValue.toFixed(2));
    },
    _updatePostal: function() {
      var $input, postal;
      $input = this.$(".deliveryAreaPostal");
      postal = parseInt($input.val(), 10);
      return this._updateModel({
        postal: postal
      });
    },
    _updateCity: function() {
      var $input, city;
      $input = this.$(".deliveryAreaCity");
      city = $input.val();
      return this._updateModel({
        city: city
      });
    },
    _updateDistrict: function() {
      var $input, district;
      $input = this.$(".deliveryAreaDistrict");
      district = $input.val();
      return this._updateModel({
        district: district
      });
    },
    _blurOnEnter: function(e) {
      var $input;
      if (e.keyCode !== 13) {
        return;
      }
      $input = $(e.target);
      return $input.blur();
    },
    _updateModel: function(changedAttributes) {
      var self;
      self = this;
      return this.model.save(changedAttributes, {
        validate: true,
        success: function() {
          return notificationcenter.notify("views.store.config.deliveryArea.change.success");
        },
        error: function() {
          notificationcenter.notify("views.store.config.deliveryArea.change.error");
          return self._render();
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=DeliveryAreaView.js.map
*/