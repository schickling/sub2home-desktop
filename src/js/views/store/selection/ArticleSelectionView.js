define(["jquery", "underscore", "backbone", "models/TimelineItemModel", "views/store/selection/info/articleSelection/InfoView", "views/store/selection/SelectionView", "views/store/selection/stage/articleSelection/MenuComponentOptionsView"], function($, _, Backbone, TimelineItemModel, InfoView, SelectionView, MenuComponentOptionsView) {
  var ArticleSelectionView;
  return ArticleSelectionView = SelectionView.extend({
    className: "articleSelection",
    stageViewClass: MenuComponentOptionsView,
    infoViewClass: InfoView,
    clickLocked: false,
    _prepare: function() {
      var articleModel, menuComponentBlockMediaModel, menuComponentBlockModel, timelineItemModel;
      timelineItemModel = new TimelineItemModel();
      menuComponentBlockModel = this.model.get("menuComponentBlockModel");
      articleModel = this.model.get("articleModel");
      if (menuComponentBlockModel) {
        this.active = true;
        menuComponentBlockMediaModel = menuComponentBlockModel.get("menuComponentBlockMediaModel");
        timelineItemModel.set({
          isLocked: articleModel === null,
          icon: menuComponentBlockMediaModel.get("icon"),
          image: menuComponentBlockMediaModel.get("smallImage"),
          phrase: this._getTitle()
        });
        this._listenForArticleSelection();
      } else {
        timelineItemModel.set({
          isDisabled: true,
          wasVisited: true,
          image: articleModel.get("smallImage")
        });
      }
      return this.timelineItemsCollection.add(timelineItemModel);
    },
    _listenForArticleSelection: function() {
      var menuComponentBlockModel, menuComponentOptionArticlesCollection, menuComponentOptionsCollection, orderedArticleModel, timelineItemModel, timelineItemsCollection;
      orderedArticleModel = this.model;
      menuComponentBlockModel = orderedArticleModel.get("menuComponentBlockModel");
      menuComponentOptionsCollection = menuComponentBlockModel.get("menuComponentOptionsCollection");
      timelineItemsCollection = this.timelineItemsCollection;
      timelineItemModel = void 0;
      menuComponentOptionArticlesCollection = void 0;
      return _.each(menuComponentOptionsCollection.models, (function(menuComponentOptionModel) {
        menuComponentOptionArticlesCollection = menuComponentOptionModel.get("menuComponentOptionArticlesCollection");
        return _.each(menuComponentOptionArticlesCollection.models, (function(menuComponentOptionArticleModel) {
          return this.listenTo(menuComponentOptionArticleModel, "change:isSelected", function() {
            if (menuComponentOptionArticleModel.get("isSelected")) {
              timelineItemModel = timelineItemsCollection.first();
              timelineItemModel.set("isLocked", false);
              return orderedArticleModel.trigger("articleModelWasSelected");
            }
          });
        }), this);
      }), this);
    },
    _getTitle: function() {
      var menuComponentBlockModel, menuComponentOptionTitle, menuComponentOptionsCollection, title;
      menuComponentBlockModel = this.model.get("menuComponentBlockModel");
      menuComponentOptionsCollection = menuComponentBlockModel.get("menuComponentOptionsCollection");
      menuComponentOptionTitle = void 0;
      title = "";
      if (menuComponentOptionsCollection.length === 1) {
        title = "Wähle dein ";
      }
      _.each(menuComponentOptionsCollection.models, function(menuComponentOptionModel, index) {
        menuComponentOptionTitle = menuComponentOptionModel.get("title");
        if (index === 0) {
          return title += menuComponentOptionTitle;
        } else if (index === (menuComponentOptionsCollection.length - 1)) {
          return title += " oder " + menuComponentOptionTitle;
        } else {
          return title += ", " + menuComponentOptionTitle;
        }
      });
      return title;
    }
  });
});

/*
//@ sourceMappingURL=ArticleSelectionView.js.map
*/