define(["jquery", "underscore", "backbone", "models/cartModel", "text!templates/store/tray/CommentTemplate.html"], function($, _, Backbone, cartModel, CommentTemplate) {
  var CommentView;
  return CommentView = Backbone.View.extend({
    template: _.template(CommentTemplate),
    events: {
      "focusout textarea": "_saveComment"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        comment: cartModel.getComment()
      };
      return this.$el.html(this.template(json));
    },
    _saveComment: function(e) {
      var $textarea, comment;
      $textarea = $(e.target);
      comment = $textarea.val();
      return cartModel.setComment(comment);
    }
  });
});

/*
//@ sourceMappingURL=CommentView.js.map
*/