define(["underscore", "backbone", "models/MenuBundleModel", "collections/TimelineItemsCollection", "collections/OrderedArticlesCollection"], function(_, Backbone, MenuBundleModel, TimelineItemsCollection, OrderedArticlesCollection) {
  var OrderedItemModel;
  return OrderedItemModel = Backbone.Model.extend({
    defaults: {
      id: 0,
      amount: 1,
      total: 0,
      menuBundleModel: null,
      orderedArticlesCollection: null,
      timelineItemsCollection: null,
      isInCart: false
    },
    initialize: function() {
      if (this.get("id") === 0) {
        this.set({
          id: _.uniqueId()
        }, {
          silent: true
        });
      }
      if (!this.get("orderedArticlesCollection")) {
        this.set("orderedArticlesCollection", new OrderedArticlesCollection());
      }
      if (!this.get("timelineItemsCollection")) {
        this.set("timelineItemsCollection", new TimelineItemsCollection());
      }
      return this._initializeListeners();
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (this.get("orderedArticlesCollection")) {
        attributes.orderedArticlesCollection = attributes.orderedArticlesCollection.toJSON();
      }
      if (this.get("menuBundleModel")) {
        attributes.menuBundleModel = attributes.menuBundleModel.toJSON();
      }
      delete attributes.timelineItemsCollection;
      return attributes;
    },
    parse: function(response) {
      if (response.hasOwnProperty("orderedArticlesCollection")) {
        response.orderedArticlesCollection = new OrderedArticlesCollection(response.orderedArticlesCollection, {
          parse: true
        });
        _.each(response.orderedArticlesCollection.models, (function(orderedArticleModel) {
          return orderedArticleModel.set({
            orderedItemModel: this
          }, {
            silent: true
          });
        }), this);
      }
      if (response.hasOwnProperty("menuBundleModel") && response.menuBundleModel) {
        response.menuBundleModel = new MenuBundleModel(response.menuBundleModel, {
          parse: true
        });
      }
      return response;
    },
    destroy: function() {
      return this.collection.remove(this);
    },
    isMenuBundle: function() {
      return this.get("menuBundleModel") !== null;
    },
    isMenu: function() {
      return this.isMenuBundle() || this.get("orderedArticlesCollection").first().hasBeenUpgraded();
    },
    reduceOrderedArticles: function() {
      var i, orderedArticleModel, orderedArticlesCollection, _results;
      orderedArticlesCollection = this.get("orderedArticlesCollection");
      orderedArticleModel = void 0;
      i = 0;
      _results = [];
      while (i < orderedArticlesCollection.length) {
        orderedArticleModel = orderedArticlesCollection.models[i];
        if (!orderedArticleModel.isMenuUpgradeBase()) {
          orderedArticleModel.destroy();
          i--;
        }
        _results.push(i++);
      }
      return _results;
    },
    getMenuTitle: function() {
      var firstOrderedArticleModel, menuBundleModel, menuUpgradeModel;
      if (this.isMenuBundle()) {
        menuBundleModel = this.get("menuBundleModel");
        return menuBundleModel.get("title");
      } else {
        firstOrderedArticleModel = this.get("orderedArticlesCollection").first();
        menuUpgradeModel = firstOrderedArticleModel.get("menuUpgradeModel");
        return menuUpgradeModel.get("title");
      }
    },
    isEditable: function() {
      var articleModel, orderedArticleModel;
      if (this.isMenu()) {
        return true;
      }
      orderedArticleModel = this.get("orderedArticlesCollection").first();
      articleModel = orderedArticleModel.get("articleModel");
      return articleModel.get("allowsIngredients");
    },
    canBeUpgraded: function() {
      return this.get("orderedArticlesCollection").first().isMenuUpgradeBase();
    },
    isComplete: function() {
      return true;
    },
    _initializeListeners: function() {
      var orderedArticlesCollection;
      this._listenToAmount();
      orderedArticlesCollection = this.get("orderedArticlesCollection");
      _.each(orderedArticlesCollection.models, (function(orderedArticleModel) {
        return this._addOrderedArticleListener(orderedArticleModel);
      }), this);
      orderedArticlesCollection.on("add", (function(orderedArticleModel) {
        return this._addOrderedArticleListener(orderedArticleModel);
      }), this);
      orderedArticlesCollection.on("remove", function(orderedArticleModel) {
        return orderedArticleModel.off("priceChanged");
      });
      return this.on("recalculate", this._calculateTotal, this);
    },
    _listenToAmount: function() {
      return this.on("change:amount", this._calculateTotal, this);
    },
    _addOrderedArticleListener: function(orderedArticleModel) {
      return orderedArticleModel.on("priceChanged", this._calculateTotal, this);
    },
    _calculateTotal: function() {
      var baseArticleModel, baseOrderedArticleModel, menuBundleModel, menuUpgradeModel, menuUpgradeOrderedArticleModels, orderedArticlesCollection, total;
      total = 0;
      orderedArticlesCollection = this.get("orderedArticlesCollection");
      if (this.isMenuBundle()) {
        menuBundleModel = this.get("menuBundleModel");
        total = menuBundleModel.get("price");
        _.each(orderedArticlesCollection.models, function(orderedArticleModel) {
          var articleModel;
          articleModel = orderedArticleModel.get("articleModel");
          if (articleModel) {
            total += articleModel.get("ingredientsTotal");
            return total += articleModel.get("deposit");
          }
        });
      } else {
        baseOrderedArticleModel = orderedArticlesCollection.first();
        baseArticleModel = baseOrderedArticleModel.get("articleModel");
        total = baseArticleModel.get("total");
        if (baseOrderedArticleModel.hasBeenUpgraded()) {
          menuUpgradeOrderedArticleModels = orderedArticlesCollection.without(baseOrderedArticleModel);
          menuUpgradeModel = baseOrderedArticleModel.get("menuUpgradeModel");
          total += menuUpgradeModel.get("price");
          _.each(menuUpgradeOrderedArticleModels, function(menuUpgradeOrderedArticleModel) {
            var menuUpgradeArticleModel;
            menuUpgradeArticleModel = menuUpgradeOrderedArticleModel.get("articleModel");
            if (menuUpgradeArticleModel) {
              total += menuUpgradeArticleModel.get("ingredientsTotal");
              return total += menuUpgradeArticleModel.get("deposit");
            }
          });
        }
      }
      return this.set("total", total * this.get("amount"));
    },
    isEditable: function() {
      var articleModel, orderedArticleModel;
      if (this.isMenu()) {
        return true;
      }
      orderedArticleModel = this.get("orderedArticlesCollection").first();
      articleModel = orderedArticleModel.get("articleModel");
      return articleModel.get("allowsIngredients");
    },
    canBeUpgraded: function() {
      return this.get("orderedArticlesCollection").first().isMenuUpgradeBase();
    },
    isComplete: function() {
      var isComplete;
      isComplete = true;
      this.get('orderedArticlesCollection').each(function(orderedArticleModel) {
        if (!orderedArticleModel.isComplete()) {
          return isComplete = false;
        }
      });
      return isComplete;
    }
  });
});
