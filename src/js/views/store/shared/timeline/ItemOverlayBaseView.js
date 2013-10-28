define(["jquery", "underscore", "backbone", "text!templates/store/shared/timeline/ItemOverlayTemplate.html"], function($, _, Backbone, ItemOverlayTemplate) {
  var ItemOverlayBaseView;
  return ItemOverlayBaseView = Backbone.View.extend({
    className: "itemTimeline",
    template: _.template(ItemOverlayTemplate),
    initialize: function() {
      return this.render();
    },
    render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    }
  });
});

/*
//@ sourceMappingURL=ItemOverlayBaseView.js.map
*/