define(["jquery", "underscore", "backbone", "views/PageView", "views/shared/info/HomeView", "views/shared/info/NavigationView", "text!templates/home/info/MainTemplate.html"], function($, _, Backbone, PageView, HomeView, NavigationView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    template: _.template(MainTemplate),
    pageTitle: "Infotheke - sub2home",
    initialize: function() {
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this._renderHome();
      this._renderNavigation();
      return this.append();
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