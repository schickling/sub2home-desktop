define(["jquery", "underscore", "backbone", "collections/MenuBundlesCollection", "views/store/assortment/SectionBaseView", "views/store/assortment/menuBundles/MenuBundleView", "views/store/assortment/menuBundles/ControlView"], function($, _, Backbone, MenuBundlesCollection, SectionBaseView, MenuBundleView, ControlView) {
  var MenuBundlesView;
  return MenuBundlesView = SectionBaseView.extend({
    controlViewClass: ControlView,
    collectionClass: MenuBundlesCollection,
    className: "menuBundles",
    _fetchCollection: function() {
      var self;
      self = this;
      return this.collection.fetch({
        success: function() {
          return self._renderContent();
        }
      });
    },
    _renderContent: function() {
      return _.each(this.collection.models, (function(menuBundleModel) {
        return this._renderMenuBundle(menuBundleModel);
      }), this);
    },
    _renderMenuBundle: function(menuBundleModel) {
      var menuBundleView;
      menuBundleView = new MenuBundleView({
        model: menuBundleModel
      });
      return this.$content.append(menuBundleView.el);
    }
  });
});

/*
//@ sourceMappingURL=MenuBundlesView.js.map
*/