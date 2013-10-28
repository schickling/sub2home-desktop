define(["underscore", "backbone", "services/notificationcenter"], function(_, Backbone, notificationcenter) {
  var DeliveryAreaModel;
  return DeliveryAreaModel = Backbone.Model.extend({
    defaults: {
      minimumValue: 0,
      minimumDuration: 0,
      district: "",
      city: "",
      postal: 0,
      isSelected: false
    },
    urlRoot: function() {
      if (this.isNew()) {
        return "stores/storeAlias/deliveryareas";
      } else {
        return "deliveryareas";
      }
    },
    initialize: function() {
      return this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.deliveryAreaModel.invalid", {
          error: error
        });
      });
    },
    validate: function(attributes) {
      var minimumDuration, minimumValue, postal;
      minimumValue = attributes.minimumValue;
      if (typeof minimumValue !== "number" || minimumValue !== parseFloat(minimumValue)) {
        return "minimumValue has to be numeric";
      }
      if (minimumValue < 0) {
        return "minimumValue can't be negative";
      }
      minimumDuration = attributes.minimumDuration;
      if (typeof minimumDuration !== "number" || minimumDuration !== parseFloat(minimumDuration)) {
        return "minimumDuration has to be numeric";
      }
      if (minimumDuration < 0) {
        return "minimumDuration can't be negative";
      }
      postal = attributes.postal;
      if (typeof postal !== "number" || postal !== parseInt(postal, 10)) {
        return "postal has to be numeric";
      }
      if (postal < 10000 || postal > 99999) {
        return "no valid postal";
      }
    }
  });
});

/*
//@ sourceMappingURL=DeliveryAreaModel.js.map
*/