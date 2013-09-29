define(["jquery", "underscore", "backbone", "services/notificationcenter", "views/store/config/AddressView", "text!templates/store/config/StoreInfoTemplate.html"], function($, _, Backbone, notificationcenter, AddressView, StoreInfoTemplate) {
  var StoreInfoView;
  return StoreInfoView = Backbone.View.extend({
    events: {
      "focusout #storeDescriptionInput": "_updateDescription",
      "focusout #storeOrderingContactInput": "_updateOrderEmail",
      "focusout #storeFacebookInput": "_updateFacebookUrl",
      "mouseenter #bMail": "_tooltipForTestOrder",
      "mouseleave .iBtn": "_dismissTooltip",
      "click #bMail": "_sendTestOrder",
      "click #storeOpen": "_toggleOpen",
      "click #payment button.toggle": "_togglePaymentMethod"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {
        number: this.model.get("number"),
        title: this.model.get("title"),
        orderEmail: this.model.get("orderEmail"),
        isOpen: this.model.get("isOpen"),
        facebookUrl: this.model.get("facebookUrl").replace('https://www.facebook.com/', ''),
        allowsPaymentEc: this.model.get("allowsPaymentEc"),
        allowsPaymentCash: this.model.get("allowsPaymentCash")
      };
      this.$el.html(_.template(StoreInfoTemplate, json));
      return new AddressView({
        el: this.$("#storeAddress"),
        model: this.model
      });
    },
    _updateDescription: function(e) {
      var $textarea, description;
      $textarea = $(e.target);
      description = $textarea.val();
      this.model.set("description", description);
      return this._saveModel();
    },
    _updateOrderEmail: function(e) {
      var $input, val;
      $input = $(e.target);
      val = $input.val();
      this.model.set("orderEmail", val);
      return this._saveModel();
    },
    _updateFacebookUrl: function(e) {
      var $input, val;
      $input = $(e.target);
      val = "https://www.facebook.com/" + ($input.val());
      this.model.set("facebookUrl", val);
      return this._saveModel();
    },
    _sendTestOrder: function() {
      return $.ajax({
        url: "stores/storeAlias/testorder",
        type: "post",
        success: function() {
          return notificationcenter.notify("views.store.config.testOrder.success");
        },
        error: function() {
          return notificationcenter.notify("views.store.config.testOrder.error");
        }
      });
    },
    _toggleOpen: function() {
      var $button, isOpen;
      $button = this.$("#storeOpen");
      isOpen = !this.model.get("isOpen");
      this.model.set("isOpen", isOpen);
      return this.model.save({}, {
        success: function() {
          if (isOpen) {
            notificationcenter.notify("views.store.config.isOpen");
          } else {
            notificationcenter.notify("views.store.config.isClosed");
          }
          return $button.toggleClass("isOpen");
        },
        error: function() {
          return notificationcenter.notify("views.store.config.isOpenError");
        }
      });
    },
    _togglePaymentMethod: function(e) {
      var $button, $wrapper, attribute, changedAttributes, method, self, storeModel, value;
      self = this;
      storeModel = this.model;
      $button = $(e.target);
      $wrapper = $button.parent();
      method = $button.attr("data-method");
      attribute = "allowsPayment" + method;
      value = !this.model.get(attribute);
      changedAttributes = {};
      changedAttributes[attribute] = value;
      return this.model.save(changedAttributes, {
        validate: true,
        success: function() {
          notificationcenter.notify("views.store.config.paymentMethods.success");
          return $wrapper.toggleClass("disabled");
        },
        error: function() {
          return notificationcenter.notify("views.store.config.paymentMethods.error");
        }
      });
    },
    _saveModel: function() {
      var self;
      self = this;
      return this.model.save({}, {
        success: function() {
          return notificationcenter.notify("views.store.config.info.success");
        },
        error: function() {
          return notificationcenter.notify("views.store.config.info.error");
        }
      });
    },
    _tooltipForTestOrder: function() {
      var offset;
      offset = this.$("#bMail").offset();
      return notificationcenter.tooltip("views.store.config.testOrder", offset.top + 24, offset.left + 15);
    },
    _dismissTooltip: function() {
      return notificationcenter.hideTooltip();
    }
  });
});
