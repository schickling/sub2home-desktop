define(["jquery", "underscore", "backbone", "services/router", "views/PageView", "text!templates/home/404/MainTemplate.html"], function($, _, Backbone, router, PageView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    pageTitle: "Seite nicht gefunden - sub2home",
    events: {
      "click .bigBack": "_back"
    },
    initialize: function() {
      this._render();
      return this.append();
    },
    _render: function() {
      return this.$el.html(MainTemplate);
    },
    _back: function() {
      return router.navigate("/", true);
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/