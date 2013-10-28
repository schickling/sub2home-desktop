define(["jquery", "underscore", "backbone", "services/notificationcenter", "models/DeliveryAreaModel", "views/store/config/DeliveryAreaView"], function($, _, Backbone, notificationcenter, DeliveryAreaModel, DeliveryAreaView) {
  var DeliveryAreasView;
  return DeliveryAreasView = Backbone.View.extend({
    events: {
      "click .bAdd": "_addDeliveryArea"
    },
    $configContent: null,
    initialize: function() {
      this._cacheDom();
      return this._render();
    },
    _cacheDom: function() {
      return this.$configContent = this.$(".configContent");
    },
    _render: function() {
      return _.each(this.collection.models, (function(item) {
        return this._renderDeliveryArea(item);
      }), this);
    },
    _renderDeliveryArea: function(item) {
      var deliveryAreaView;
      deliveryAreaView = new DeliveryAreaView({
        model: item
      });
      return this.$configContent.append(deliveryAreaView.el);
    },
    _addDeliveryArea: function() {
      var self;
      self = this;
      return this.collection.create({}, {
        validate: false,
        success: function(deliveryAreaModel) {
          notificationcenter.notify("views.store.config.deliveryArea.add.success");
          return self._renderDeliveryArea(deliveryAreaModel);
        },
        error: function() {
          return notificationcenter.notify("views.store.config.deliveryArea.add.error");
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=DeliveryAreasView.js.map
*/