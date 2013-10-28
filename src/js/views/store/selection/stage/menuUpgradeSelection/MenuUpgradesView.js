define(["jquery", "underscore", "backbone", "views/store/selection/stage/SlideView", "views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView", "views/store/selection/stage/menuUpgradeSelection/NoUpgradeView"], function($, _, Backbone, SlideView, MenuUpgradeView, NoUpgradeView) {
  var MenuUpgradesView;
  return MenuUpgradesView = SlideView.extend({
    $menuUpgradesContainer: null,
    afterInitialize: function() {
      var articleModel;
      this.$el.addClass("menuUpgrades");
      articleModel = this.model.get("articleModel");
      this.collection = articleModel.get("menuUpgradesCollection");
      this._renderNoUpgradeView();
      return this._renderMenuUpgrades();
    },
    adjustWidth: function() {
      this.$el.width(window.innerWidth - 301);
      return this._centerVertically();
    },
    _renderMenuUpgrades: function() {
      this.$menuUpgradesContainer = $("<div class=\"menuUpgradesContainer\">");
      this.$el.append(this.$menuUpgradesContainer);
      return _.each(this.collection.models, (function(menuUpgradeModel) {
        return this._renderMenuUpgrade(menuUpgradeModel);
      }), this);
    },
    _renderMenuUpgrade: function(menuUpgradeModel) {
      var menuUpgradeView;
      menuUpgradeView = new MenuUpgradeView({
        model: menuUpgradeModel,
        orderedArticleModel: this.model
      });
      return this.$menuUpgradesContainer.append(menuUpgradeView.el);
    },
    _renderNoUpgradeView: function() {
      var noUpgradeView;
      noUpgradeView = new NoUpgradeView({
        model: this.model
      });
      return this.$el.append(noUpgradeView.el);
    },
    _centerVertically: function() {
      var $menuUpgradesContainer, marginTop, menuUpgradesHeight, slideHeight;
      $menuUpgradesContainer = this.$(".menuUpgradesContainer");
      slideHeight = this.$el.height();
      menuUpgradesHeight = $menuUpgradesContainer.height();
      marginTop = (slideHeight - menuUpgradesHeight) / 2;
      return $menuUpgradesContainer.css({
        marginTop: marginTop
      });
    }
  });
});

/*
//@ sourceMappingURL=MenuUpgradesView.js.map
*/