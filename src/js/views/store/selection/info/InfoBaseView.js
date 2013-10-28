define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var InfoBaseView;
  return InfoBaseView = Backbone.View.extend({
    className: "info",
    initialize: function() {
      return this.render();
    },
    render: function() {
      var $el;
      $el = $("<div>").addClass(this.className).appendTo(this.$el);
      this.$el = $el;
      this.$el.html(this.template());
      this.renderContent();
      return this;
    },
    template: function() {},
    renderContent: function() {}
  });
});

/*
//@ sourceMappingURL=InfoBaseView.js.map
*/