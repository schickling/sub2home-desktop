define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/client/config/AddressTemplate.html"], function($, _, Backbone, notificationcenter, AddressTemplate) {
  var AddressView;
  return AddressView = Backbone.View.extend({
    template: _.template(AddressTemplate),
    events: {
      "focusout input": "_update"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        firstName: this.model.get("firstName"),
        lastName: this.model.get("lastName"),
        street: this.model.get("street"),
        streetNumber: this.model.get("streetNumber"),
        streetAdditional: this.model.get("streetAdditional"),
        city: this.model.get("city"),
        district: this.model.get("district"),
        phone: this.model.get("phone"),
        email: this.model.get("email"),
        postal: this.model.get("postal")
      };
      return this.$el.html(this.template(json));
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
            return notificationcenter.notify("views.client.config.address.success");
          },
          error: function() {
            return notificationcenter.notify("views.client.config.address.error");
          }
        });
      }
    }
  });
});

/*
//@ sourceMappingURL=AddressView.js.map
*/