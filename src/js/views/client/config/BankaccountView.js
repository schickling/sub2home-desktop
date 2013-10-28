define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/client/config/BankaccountTemplate.html"], function($, _, Backbone, notificationcenter, BankaccountTemplate) {
  var BankaccountView;
  return BankaccountView = Backbone.View.extend({
    template: _.template(BankaccountTemplate),
    events: {
      "focusout input": "_update"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    },
    _update: function(e) {
      var $input, field, val;
      $input = $(e.target);
      field = $input.attr("data-field");
      val = $input.val();
      if (val !== this.model.get(field)) {
        this.model.set(field, val);
        return this.model.save({}, {
          success: function() {
            return notificationcenter.notify("views.client.config.bankaccount.success");
          },
          error: function() {
            return notificationcenter.notify("views.client.config.bankaccount.error");
          }
        });
      }
    }
  });
});

/*
//@ sourceMappingURL=BankaccountView.js.map
*/