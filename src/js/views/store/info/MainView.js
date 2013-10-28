define(["jquery", "underscore", "backbone", "models/stateModel", "views/PageView", "views/shared/info/HomeView", "views/store/info/StoreView", "views/shared/info/NavigationView", "text!templates/store/info/MainTemplate.html"], function($, _, Backbone, stateModel, PageView, HomeView, StoreView, NavigationView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    template: _.template(MainTemplate),
    initialize: function() {
      this.model = stateModel.get("storeModel");
      this.pageTitle = "Infotheke " + this.model.get("title") + " - sub2home";
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this._renderStore();
      this._renderHome();
      this._renderNavigation();
      return this.append();
    },
    _renderStore: function() {
      return new StoreView({
        el: this.$("#storeInfo"),
        model: this.model
      });
    },
    _renderHome: function() {
      return new HomeView({
        el: this.$("#homeInfo")
      });
    },
    _renderNavigation: function() {
      return new NavigationView({
        el: this.$el
      });
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/