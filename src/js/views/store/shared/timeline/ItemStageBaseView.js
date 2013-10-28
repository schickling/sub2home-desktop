define(["jquery", "underscore", "backbone", "text!templates/store/shared/timeline/ItemStageTemplate.html"], function($, _, Backbone, ItemStageTemplate) {
  var ItemStageBaseView;
  return ItemStageBaseView = Backbone.View.extend({
    className: "itemTimeline",
    template: _.template(ItemStageTemplate),
    initialize: function() {
      return this.render();
    },
    render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    }
  });
});

/*
//@ sourceMappingURL=ItemStageBaseView.js.map
*/