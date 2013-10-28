define(["jquery", "underscore", "backbone", "views/store/assortment/ControlBaseView"], function($, _, Backbone, ControlBaseView) {
  var ControlView;
  return ControlView = ControlBaseView.extend({
    events: {
      "click .bReset": "_resetAllPrices",
      "click .showAll": "_showAllArticles"
    },
    _countItems: function() {
      var numberOfItems;
      numberOfItems = 0;
      _.each(this.collection.models, function(categoryModel) {
        return numberOfItems += categoryModel.get("articlesCollection").length;
      });
      return this.numberOfItems = numberOfItems;
    },
    _resetAllPrices: function() {
      _.each(this.collection.models, (function(categoryModel) {
        var articlesCollection;
        articlesCollection = categoryModel.get("articlesCollection");
        return _.each(articlesCollection.models, (function(articleModel) {
          if (articleModel.get("price") !== articleModel.get("customPrice")) {
            return this._updateModel(articleModel, {
              customPrice: articleModel.get("price")
            });
          }
        }), this);
      }), this);
      return this._updateLoadBar();
    },
    _showAllArticles: function() {
      _.each(this.collection.models, (function(categoryModel) {
        var articlesCollection;
        articlesCollection = categoryModel.get("articlesCollection");
        return _.each(articlesCollection.models, (function(articleModel) {
          if (!articleModel.get("isActive")) {
            return this._updateModel(articleModel, {
              isActive: true
            });
          }
        }), this);
      }), this);
      return this._updateLoadBar();
    }
  });
});

/*
//@ sourceMappingURL=ControlView.js.map
*/