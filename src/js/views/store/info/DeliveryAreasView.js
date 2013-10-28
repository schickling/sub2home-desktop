define(["jquery", "underscore", "backbone", "views/store/info/DeliveryAreaView"], function($, _, Backbone, DeliveryAreaView) {
  var DeliveryAreasView;
  return DeliveryAreasView = Backbone.View.extend({
    $firstColumn: null,
    $secondColumn: null,
    initialize: function() {
      this._cacheDom();
      return this._render();
    },
    _cacheDom: function() {
      this.$firstColumn = this.$(".fluidColumn").first();
      return this.$secondColumn = this.$(".fluidColumn").last();
    },
    _render: function() {
      var collectionSize, lastPostal;
      collectionSize = this.collection.length;
      lastPostal = void 0;
      return _.each(this.collection.models, (function(deliveryAreaModel, index) {
        this._renderDeliveryArea(deliveryAreaModel, index / collectionSize <= 0.5, deliveryAreaModel.get("postal") === lastPostal);
        return lastPostal = deliveryAreaModel.get("postal");
      }), this);
    },
    _renderDeliveryArea: function(deliveryAreaModel, placeInFirstCollumn, hidePostal) {
      var deliveryAreaView;
      deliveryAreaView = new DeliveryAreaView({
        model: deliveryAreaModel
      });
      if (placeInFirstCollumn) {
        this.$firstColumn.append(deliveryAreaView.el);
      } else {
        this.$secondColumn.append(deliveryAreaView.el);
      }
      return deliveryAreaView.$el.toggleClass("hidePostal", hidePostal);
    }
  });
});

/*
//@ sourceMappingURL=DeliveryAreasView.js.map
*/