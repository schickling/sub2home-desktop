define(["jquery", "underscore", "backbone", "text!templates/store/selection/stage/menuUpgradeSelection/NoUpgradeTemplate.html"], function($, _, Backbone, NoUpgradeTemplate) {
  var NoUpgradeView;
  return NoUpgradeView = Backbone.View.extend({
    template: _.template(NoUpgradeTemplate),
    events: {
      click: "_resetMenuUpgrade"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var articleModel, json;
      articleModel = this.model.get("articleModel");
      json = {
        currentArticleImage: articleModel.get("largeImage"),
        currentArticleTitle: articleModel.get("title")
      };
      this.$el.html(this.template(json));
      return this.$el.attr("id", "noUpgrade");
    },
    _resetMenuUpgrade: function() {
      this.model.set("menuUpgradeModel", null);
      return this.model.get("orderedItemModel").reduceOrderedArticles();
    }
  });
});

/*
//@ sourceMappingURL=NoUpgradeView.js.map
*/