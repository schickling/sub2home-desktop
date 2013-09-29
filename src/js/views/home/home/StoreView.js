define(["jquery", "underscore", "services/gmaps", "services/notificationcenter", "text!templates/home/home/StoreTemplate.html"], function($, _, gmaps, notificationcenter, StoreTemplate) {
  var StoreView;
  StoreView = function(model, parentView) {
    var addressModel, isDelivering, json, nextDeliveryTimeModel;
    this.parentView = parentView;
    this.model = model;
    addressModel = this.model.get("addressModel");
    this.position = new gmaps.LatLng(addressModel.get("latitude"), addressModel.get("longitude"));
    this.setValues({
      map: parentView.map
    });
    isDelivering = this.model.isDelivering();
    json = {
      title: this.model.get("title"),
      isDelivering: isDelivering
    };
    if (!isDelivering) {
      nextDeliveryTimeModel = this.model.getNextDeliveryTimeModel();
      json.nextDeliveryTime = nextDeliveryTimeModel.getStartTime();
    }
    this.$el = $(this.template(json));
    this.$note = this.$el.find(".smallNote");
    return this.state = "initialized";
  };
  StoreView.prototype = new gmaps.OverlayView();
  StoreView.prototype.template = _.template(StoreTemplate);
  StoreView.prototype.selectStore = function() {
    switch (this.state) {
      case "initialized":
        return notificationcenter.notify("views.home.home.selectDeliveryArea");
      case "available":
        return this.parentView.selectStore(this.model);
      case "unavailable":
        return notificationcenter.notify("views.home.home.storeNotInRange");
    }
  };
  StoreView.prototype.onAdd = function() {
    var pane,
      _this = this;
    pane = this.getPanes().overlayMouseTarget;
    $(pane).append(this.$el);
    return this.$el.on("click", function() {
      return _this.selectStore();
    });
  };
  StoreView.prototype.draw = function() {
    var position, projection;
    projection = this.getProjection();
    position = projection.fromLatLngToDivPixel(this.position);
    return this.$el.css({
      left: position.x - this.$el.width() / 2,
      top: position.y
    });
  };
  StoreView.prototype.updateView = function() {
    var deliveryAreasCollection, storeAvailable;
    deliveryAreasCollection = this.model.get("deliveryAreasCollection");
    storeAvailable = deliveryAreasCollection.where({
      isSelected: true
    }).length;
    if (storeAvailable) {
      return this.markAvailable();
    } else {
      return this.markUnavailable();
    }
  };
  StoreView.prototype.markAvailable = function() {
    var _this = this;
    this.state = "available";
    this.$el.removeClass("unavailable");
    this.$el.off("mouseenter mouseleave").on("mouseenter", function() {
      return _this.$note.addClass("hover");
    });
    return this.$el.off("mouseenter mouseleave").on("mouseleave", function() {
      return _this.$note.removeClass("hover");
    });
  };
  StoreView.prototype.markUnavailable = function() {
    this.state = "unavailable";
    this.$el.addClass("unavailable");
    return this.$el.off("mouseenter mouseleave");
  };
  StoreView.prototype.remove = function() {
    this.setMap(null);
    return this.$el.remove();
  };
  return StoreView;
});
