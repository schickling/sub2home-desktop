define(["jquery", "underscore", "backbone", "text!templates/store/dashboard/details/InfoTemplate.html"], function($, _, Backbone, InfoTemplate) {
  var InfoView;
  return InfoView = Backbone.View.extend({
    template: _.template(InfoTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        comment: this.model.get("comment")
      };
      return this.$el.html(this.template(json));
    }
  });
});

/*
//@ sourceMappingURL=InfoView.js.map
*/