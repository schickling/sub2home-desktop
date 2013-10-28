define(["jquery", "underscore", "backbone", "views/store/selection/info/menuUpgradeSelection/InfoView", "views/store/selection/SelectionView", "views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView"], function($, _, Backbone, InfoView, SelectionView, MenuUpgradesView) {
  var MenuUpgradeSelectionView;
  return MenuUpgradeSelectionView = SelectionView.extend({
    stageViewClass: MenuUpgradesView,
    infoViewClass: InfoView,
    _prepare: function() {
      var articleModel, menuUpgradesCollection;
      articleModel = this.model.get("articleModel");
      if (this.model.isMenuUpgradeBase() && articleModel.get("allowsMenuUpgrades")) {
        menuUpgradesCollection = articleModel.get("menuUpgradesCollection");
        if (menuUpgradesCollection && menuUpgradesCollection.length > 0) {
          this.active = true;
          this.timelineItemsCollection.add({
            phrase: "Mach's zum Menü",
            menuUpgradeSelection: true,
            icon: "iMenuUpgrade",
            image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menuupgrade.png"
          });
          return this._listenForSelection();
        }
      }
    },
    _listenForSelection: function() {
      var baseOrderedArticleModel;
      baseOrderedArticleModel = this.model;
      return this.listenTo(baseOrderedArticleModel, "change:menuUpgradeModel", function() {
        if (baseOrderedArticleModel.get("menuUpgradeModel")) {
          return this._selectMenuUpgrade(baseOrderedArticleModel.get("menuUpgradeModel"));
        }
      });
    },
    _selectMenuUpgrade: function(menuUpgradeModel) {
      var menuComponentBlocksCollection, orderedArticlesCollection, orderedItemModel;
      orderedArticlesCollection = this.model.collection;
      orderedItemModel = this.model.get("orderedItemModel");
      menuComponentBlocksCollection = menuUpgradeModel.get("menuComponentBlocksCollection");
      orderedItemModel.reduceOrderedArticles();
      return _.each(menuComponentBlocksCollection.models, function(menuComponentBlockModel) {
        return orderedArticlesCollection.add({
          menuComponentBlockModel: menuComponentBlockModel,
          orderedItemModel: orderedItemModel
        });
      });
    }
  });
});

/*
//@ sourceMappingURL=MenuUpgradeSelectionView.js.map
*/