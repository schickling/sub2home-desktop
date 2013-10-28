define(["jquery", "underscore", "backbone", "views/store/selection/stage/menuUpgradeSelection/MenuComponentBlockView", "text!templates/store/selection/stage/menuUpgradeSelection/MenuUpgradeTemplate.html"], function($, _, Backbone, MenuComponentBlockView, MenuUpgradeTemplate) {
  var MenuUpgradeView;
  return MenuUpgradeView = Backbone.View.extend({
    $menuComponentBlocks: null,
    className: "menuUpgrade",
    template: _.template(MenuUpgradeTemplate),
    events: {
      click: "_select"
    },
    initialize: function() {
      this.orderedArticleModel = this.options.orderedArticleModel;
      return this._render();
    },
    _render: function() {
      var baseArticleModel, json;
      baseArticleModel = this.orderedArticleModel.get("articleModel");
      json = {
        title: this.model.get("title"),
        price: this.model.get("price"),
        description: this.model.get("description"),
        baseArticleImage: baseArticleModel.get("largeImage")
      };
      this.$el.html(this.template(json));
      this._checkSelected();
      this._cacheDom();
      return this._renderMenuComponentBlocks();
    },
    _checkSelected: function() {
      var menuUpgradeModel;
      menuUpgradeModel = this.orderedArticleModel.get("menuUpgradeModel");
      if (menuUpgradeModel && menuUpgradeModel.get("id") === this.model.get("id")) {
        return this.$el.addClass("selected");
      }
    },
    _cacheDom: function() {
      return this.$menuComponentBlocks = this.$(".menuComponentBlocks");
    },
    _renderMenuComponentBlocks: function() {
      var menuComponentBlocksCollection;
      menuComponentBlocksCollection = this.model.get("menuComponentBlocksCollection");
      return _.each(menuComponentBlocksCollection.models, (function(menuComponentBlockModel) {
        return this._renderMenuComponentBlock(menuComponentBlockModel);
      }), this);
    },
    _renderMenuComponentBlock: function(menuComponentBlockModel) {
      var menuComponentBlockView;
      menuComponentBlockView = new MenuComponentBlockView({
        model: menuComponentBlockModel
      });
      return this.$menuComponentBlocks.append(menuComponentBlockView.el);
    },
    _select: function() {
      this.$el.addClass("selected");
      this.$el.siblings().removeClass("selected");
      this.orderedArticleModel.set("menuUpgradeModel", this.model);
      return this.$el.trigger("fetched");
    }
  });
});

/*
//@ sourceMappingURL=MenuUpgradeView.js.map
*/