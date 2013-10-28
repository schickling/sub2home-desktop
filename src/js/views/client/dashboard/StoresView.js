define(["jquery", "underscore", "backbone", "views/client/dashboard/StoreView"], function($, _, Backbone, StoreView) {
  var StoresView;
  return StoresView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return _.each(this.collection.models, (function(storeModel) {
        return this._renderStore(storeModel);
      }), this);
    },
    _renderStore: function(storeModel) {
      var storeView;
      storeView = new StoreView({
        model: storeModel
      });
      return this.$el.append(storeView.el);
    }
  });
});

/*
//@ sourceMappingURL=StoresView.js.map
*/