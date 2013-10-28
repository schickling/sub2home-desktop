define(["jquery", "underscore", "backbone", "services/notificationcenter", "services/postalOracle", "text!templates/home/home/PromotionTemplate.html"], function($, _, Backbone, notificationcenter, postalOracle, PromotionTemplate) {
  var PromotionView;
  return PromotionView = Backbone.View.extend({
    events: {
      "click #submitStoreSuggestion": "_submit"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return this.$el.html(PromotionTemplate);
    },
    show: function() {
      return this.$el.fadeIn();
    },
    hide: function() {
      return this.$el.fadeOut();
    },
    _submit: function() {
      var input, postal, self, text;
      input = this.$("#suggestStoreMessage").val();
      postal = postalOracle.getPostal();
      text = "Message: \"" + input + "\" Postal:" + postal;
      self = this;
      return $.ajax({
        url: "services/promotion",
        data: JSON.stringify({
          text: text
        }),
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(response) {
          self.hide();
          return notificationcenter.notify("views.home.home.promotion.success");
        },
        error: function() {
          return notificationcenter.notify("views.home.home.promotion.error");
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=PromotionView.js.map
*/