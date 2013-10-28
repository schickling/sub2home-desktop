define(["jquery", "libs/jquery.lazyload", "underscore", "backbone", "views/store/selection/stage/SlideView", "views/store/selection/stage/articleSelection/MenuComponentOptionView"], function($, jqueryLazyload, _, Backbone, SlideView, MenuComponentOptionView) {
  var MenuComponentOptionsView;
  return MenuComponentOptionsView = SlideView.extend({
    afterInitialize: function() {
      var menuComponentBlockModel;
      this.$el.addClass("menuComponentOptions");
      menuComponentBlockModel = this.model.get("menuComponentBlockModel");
      this.collection = menuComponentBlockModel.get("menuComponentOptionsCollection");
      this._render();
      this._listenForArticleSelection();
      return this._listenForDestory();
    },
    _render: function() {
      this._renderMenuComponentOptions();
      if (this.collection.length === 1) {
        this.$el.addClass("noFlag");
      }
      return this.$el.lazyload();
    },
    _renderMenuComponentOptions: function() {
      return _.each(this.collection.models, (function(menuComponentOptionModel) {
        return this._renderMenuComponentOption(menuComponentOptionModel);
      }), this);
    },
    _renderMenuComponentOption: function(menuComponentOptionModel) {
      var menuComponentOptionView;
      menuComponentOptionView = new MenuComponentOptionView({
        model: menuComponentOptionModel,
        orderedArticleModel: this.model,
        selectionView: this.options.selectionView
      });
      return this.$el.append(menuComponentOptionView.el);
    },
    _listenForArticleSelection: function() {
      var menuComponentOptionsCollection, self;
      menuComponentOptionsCollection = this.collection;
      self = this;
      return _.each(menuComponentOptionsCollection.models, function(menuComponentOptionModel) {
        var menuComponentOptionArticlesCollection;
        menuComponentOptionArticlesCollection = menuComponentOptionModel.get("menuComponentOptionArticlesCollection");
        return _.each(menuComponentOptionArticlesCollection.models, function(menuComponentOptionArticleModel) {
          return self.listenTo(menuComponentOptionArticleModel, "change:isSelected", function() {
            if (menuComponentOptionArticleModel.get("isSelected")) {
              return _.each(menuComponentOptionsCollection.models, function(menuComponentOptionModelToFilter) {
                var menuComponentOptionArticlesCollectionToFilter;
                menuComponentOptionArticlesCollectionToFilter = menuComponentOptionModel.get("menuComponentOptionArticlesCollection");
                return _.each(menuComponentOptionArticlesCollectionToFilter.models, function(menuComponentOptionArticleModelToFilter) {
                  if (menuComponentOptionArticleModelToFilter.get("isSelected") && menuComponentOptionArticleModelToFilter !== menuComponentOptionArticleModel) {
                    return menuComponentOptionArticleModelToFilter.set("isSelected", false);
                  }
                });
              });
            }
          });
        });
      });
    },
    _listenForDestory: function() {
      return this.options.selectionView.once("destroy", this.stopListening, this);
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionsView.js.map
*/