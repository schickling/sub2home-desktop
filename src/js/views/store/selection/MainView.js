define(["jquery", "jqueryOverscroll", "underscore", "backbone", "models/cartModel", "models/ArticleModel", "models/MenuBundleModel", "models/OrderedItemModel", "models/OrderedArticleModel", "collections/OrderedArticlesCollection", "collections/TimelineItemsCollection", "views/PageView", "views/store/selection/TimelineControllerView", "views/store/selection/OrderedArticlesView", "views/store/selection/timeline/CartTimelineView", "text!templates/store/selection/MainTemplate.html"], function($, jqueryOverscroll, _, Backbone, cartModel, ArticleModel, MenuBundleModel, OrderedItemModel, OrderedArticleModel, OrderedArticlesCollection, TimelineItemsCollection, PageView, TimelineControllerView, OrderedArticlesView, CartTimelineView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    orderedItemModel: null,
    events: {
      "mouseenter #timelineNote .container": "_slideTimelineUp",
      "mouseleave #timelineNote .container": "_slideTimelineDown"
    },
    subViews: {
      timelineControllerView: null,
      orderedArticlesView: null
    },
    $timelineNote: null,
    $timelineContainerWrapper: null,
    $overlay: null,
    initialize: function() {
      var selectionRessourceType;
      selectionRessourceType = this.options.selectionRessourceType;
      if (selectionRessourceType === "artikel") {
        return this._createOrderedItemFromArticle();
      } else if (selectionRessourceType === "menu") {
        return this._createOrderedItemFromMenuBundle();
      } else {
        return this._loadOrderedItemFromLocalStorage();
      }
    },
    _createOrderedItemFromArticle: function() {
      var articleModel, self;
      self = this;
      articleModel = new ArticleModel({
        id: this.options.selectionRessourceId
      });
      return articleModel.fetch({
        success: function() {
          var orderedArticleModel;
          if (!articleModel.get("ingredientCategoriesCollection") && !articleModel.get("menuUpgradesCollection")) {
            self.pageNotFound();
            return;
          }
          orderedArticleModel = new OrderedArticleModel();
          self.orderedItemModel = new OrderedItemModel({
            orderedArticlesCollection: new OrderedArticlesCollection(orderedArticleModel)
          });
          orderedArticleModel.set({
            articleModel: articleModel,
            orderedItemModel: self.orderedItemModel
          });
          self.pageTitle = "Beleg dein " + articleModel.get("title") + " - sub2home";
          return self._render();
        },
        error: function() {
          return self.pageNotFound();
        }
      });
    },
    _createOrderedItemFromMenuBundle: function() {
      var menuBundleModel, self;
      self = this;
      menuBundleModel = new MenuBundleModel({
        id: this.options.selectionRessourceId
      });
      return menuBundleModel.fetch({
        success: function() {
          var menuComponentBlocksCollection, orderedArticlesCollection;
          menuComponentBlocksCollection = menuBundleModel.get("menuComponentBlocksCollection");
          orderedArticlesCollection = new OrderedArticlesCollection();
          self.orderedItemModel = new OrderedItemModel({
            orderedArticlesCollection: orderedArticlesCollection,
            menuBundleModel: menuBundleModel
          });
          _.each(menuComponentBlocksCollection.models, function(menuComponentBlockModel) {
            var orderedArticleModel;
            orderedArticleModel = new OrderedArticleModel({
              menuComponentBlockModel: menuComponentBlockModel,
              orderedItemModel: self.orderedItemModel
            });
            return orderedArticlesCollection.add(orderedArticleModel);
          });
          self.pageTitle = "Vervollständige dein " + menuBundleModel.get("title") + " - sub2home";
          return self._render();
        },
        error: function() {
          return self.pageNotFound();
        }
      });
    },
    _loadOrderedItemFromLocalStorage: function() {
      var orderedItemsCollection;
      orderedItemsCollection = cartModel.getOrderedItemsCollection();
      this.orderedItemModel = orderedItemsCollection.get(this.options.selectionRessourceId);
      if (this.orderedItemModel) {
        this.pageTitle = "Nochmal ändern - sub2home";
        return this._render();
      } else {
        return this.pageNotFound();
      }
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this._cacheDom();
      this.append();
      this._renderCartTimelineItem();
      this._renderOrderedArticles();
      this._initializeTimelineController();
      return this._initOverscroll();
    },
    _cacheDom: function() {
      this.$timelineNote = this.$("#timelineNote");
      this.$timelineContainerWrapper = this.$timelineNote.find("#timelineContainerWrapper");
      return this.$overlay = this.$("#overlay");
    },
    _initOverscroll: function() {
      return this.$timelineContainerWrapper.overscroll({
        showThumbs: false,
        direction: "horizontal",
        wheelDirection: "horizontal",
        ignoreSizing: true
      });
    },
    _renderCartTimelineItem: function() {
      var timelineItemsCollection;
      timelineItemsCollection = new TimelineItemsCollection({
        isDisabled: true,
        icon: "iCart"
      });
      return new CartTimelineView({
        collection: timelineItemsCollection,
        el: this.$timelineNote
      });
    },
    _renderOrderedArticles: function() {
      return this.subViews.orderedArticlesView = new OrderedArticlesView({
        collection: this.orderedItemModel.get("orderedArticlesCollection"),
        el: this.$el
      });
    },
    _initializeTimelineController: function() {
      return this.subViews.timelineControllerView = new TimelineControllerView({
        model: this.orderedItemModel,
        collection: this.orderedItemModel.get("timelineItemsCollection"),
        el: this.$el
      });
    },
    _slideTimelineUp: function() {
      return this.$timelineNote.stop().animate({
        bottom: 0
      }, 300);
    },
    _slideTimelineDown: function() {
      return this.$timelineNote.stop().animate({
        bottom: -50
      }, 300);
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/