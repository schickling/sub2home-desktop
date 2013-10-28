define(["jquery", "underscore", "backbone", "text!templates/shared/info/HomeTemplate.html"], function($, _, Backbone, HomeTemplate) {
  var HomeView;
  return HomeView = Backbone.View.extend({
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return this.$el.html(HomeTemplate);
    }
  });
});

/*
//@ sourceMappingURL=HomeView.js.map
*/