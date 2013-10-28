define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var ItemsBaseView;
  return ItemsBaseView = Backbone.View.extend({
    initialize: function() {
      return this.render();
    },
    render: function() {
      return _.each(this.collection.models, (function(modelItem) {
        return this.renderItem(modelItem);
      }), this);
    },
    renderItem: function() {}
  });
});

/*
//@ sourceMappingURL=ItemsBaseView.js.map
*/