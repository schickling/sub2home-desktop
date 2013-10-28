define(["jquery", "underscore", "backbone", "text!templates/store/selection/stage/menuUpgradeSelection/MenuComponentBlockTemplate.html"], function($, _, Backbone, MenuComponentBlockTemplate) {
  var MenuComponentBlockView;
  return MenuComponentBlockView = Backbone.View.extend({
    className: "menuComponentBlock",
    template: _.template(MenuComponentBlockTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json, menuComponentBlockMediaModel;
      menuComponentBlockMediaModel = this.model.get("menuComponentBlockMediaModel");
      json = {
        title: this._getComposedTitle(),
        image: menuComponentBlockMediaModel.get("largeImage")
      };
      this.$el.html(this.template(json));
      return this.$el.addClass(menuComponentBlockMediaModel.get("placeholder"));
    },
    _getComposedTitle: function() {
      var composedTitle, i, menuComponentOptionTitle, menuComponentOptionsCollection;
      menuComponentOptionsCollection = this.model.get("menuComponentOptionsCollection");
      composedTitle = "";
      menuComponentOptionTitle = void 0;
      i = 0;
      while (i < menuComponentOptionsCollection.length) {
        menuComponentOptionTitle = menuComponentOptionsCollection.models[i].get("title");
        if (i === menuComponentOptionsCollection.length - 1) {
          composedTitle += menuComponentOptionTitle;
        } else if (i === menuComponentOptionsCollection.length - 2) {
          composedTitle += menuComponentOptionTitle + " oder ";
        } else {
          composedTitle += menuComponentOptionTitle + ", ";
        }
        i++;
      }
      return composedTitle;
    }
  });
});

/*
//@ sourceMappingURL=MenuComponentBlockView.js.map
*/