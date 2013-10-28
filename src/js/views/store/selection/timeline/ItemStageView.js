define(["jquery", "underscore", "backbone", "views/store/shared/timeline/ItemStageBaseView"], function($, _, Backbone, ItemStageBaseView) {
  var ItemStageView;
  return ItemStageView = ItemStageBaseView.extend({
    disabled: false,
    events: {
      click: "_navigate"
    },
    initialize: function() {
      var self;
      self = this;
      this.render();
      this._update();
      this.model.on("change", this._update, this);
      return this.model.on("highlight", this._highlight, this);
    },
    _update: function() {
      this.$el.toggleClass("locked", this.model.get("isLocked"));
      this.$el.toggleClass("disabled", this.model.get("isDisabled"));
      return this.$el.toggleClass("visited", this.model.get("wasVisited"));
    },
    _navigate: function() {
      if (!this.model.get("isDisabled")) {
        return this.model.set("isActive", true);
      }
    },
    _highlight: function() {
      return this.$el.css({
        color: "#dc952b"
      });
    }
  });
});

/*
//@ sourceMappingURL=ItemStageView.js.map
*/