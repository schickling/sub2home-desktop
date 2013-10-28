define(["jquery", "underscore", "backbone", "views/store/selection/stage/articleSelection/MenuComponentOptionArticlesView", "text!templates/store/selection/stage/articleSelection/MenuComponentOptionTemplate.html"], function($, _, Backbone, MenuComponentOptionArticlesView, MenuComponentOptionTemplate) {
  var MenuComponentOptionView;
  return MenuComponentOptionView = Backbone.View.extend({
    className: "menuComponentOption",
    template: _.template(MenuComponentOptionTemplate),
    initialize: function() {
      this.orderedArticleModel = this.options.orderedArticleModel;
      return this._render();
    },
    _render: function() {
      var menuComponentOptionArticlesView;
      this.$el.html(this.template(this.model.toJSON()));
      menuComponentOptionArticlesView = new MenuComponentOptionArticlesView({
        collection: this.model.get("menuComponentOptionArticlesCollection"),
        orderedArticleModel: this.orderedArticleModel,
        el: this.$(".articles"),
        selectionView: this.options.selectionView
      });
      return this;
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentOptionView.js.map
*/