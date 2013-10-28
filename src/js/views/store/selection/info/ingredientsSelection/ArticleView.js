define(["jquery", "underscore", "backbone", "text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html"], function($, _, Backbone, ArticleTemplate) {
  var ArticleView;
  return ArticleView = Backbone.View.extend({
    template: _.template(ArticleTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        image: this.model.get("largeImage"),
        title: this.model.get("title"),
        info: this.model.get("info"),
        description: this.model.get("description")
      };
      this.$el.html(this.template(json));
      return this.$el.addClass(this._getImageClass());
    },
    _getImageClass: function() {
      var image, imageWithoutFileExtension;
      image = this.model.get("largeImage");
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."));
      return imageWithoutFileExtension.split("-").pop() || "";
    }
  });
});

/*
//@ sourceMappingURL=ArticleView.js.map
*/