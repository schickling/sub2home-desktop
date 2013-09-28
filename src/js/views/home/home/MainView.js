define(["jquery", "underscore", "backbone", "services/notificationcenter", "views/PageView", "views/home/home/StoresView", "text!templates/home/home/MainTemplate.html"], function($, _, Backbone, notificationcenter, PageView, StoresView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    pageTitle: "sub2home - Deine SUBWAY®-Onlinetheke",
    subViews: {
      storesView: null
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this.subViews.storesView = new StoresView({
        el: this.$el
      });
      return this.append();
    },
    destroy: function() {
      notificationcenter.destroyAllNotifications();
      return this.destroyAllSubViews();
    }
  });
});
