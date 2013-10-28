define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/client/config/ProfileTemplate.html"], function($, _, Backbone, notificationcenter, ProfileTemplate) {
  var ProfileView;
  return ProfileView = Backbone.View.extend({
    template: _.template(ProfileTemplate),
    events: {
      "click #triggerEditPassword p": "_showPasswordFields",
      "click #submitNewPassword": "_saveNewPassword",
      "click #cancelEditPassword": "_hidePasswordFields",
      "keyup #editPassword input": "_updateSubmitButton",
      "keypress #editPassword input": "_checkEnterKey"
    },
    initialize: function() {
      this._render();
      return this._listenToNameChange();
    },
    _render: function() {
      var addressModel, json;
      addressModel = this.model.get("addressModel");
      json = {
        name: addressModel.get("firstName") + " " + addressModel.get("lastName"),
        number: this.model.get("number")
      };
      return this.$el.html(this.template(json));
    },
    _listenToNameChange: function() {
      var addressModel;
      addressModel = this.model.get("addressModel");
      return this.listenTo(addressModel, "change:firstName change:lastName", this._render);
    },
    _showPasswordFields: function() {
      var $cancelEditPassword, $editPassword, $el, $submitNewPassword, $triggerEditPasswordButton, animationTime;
      animationTime = 300;
      $el = this.$el;
      $editPassword = this.$("#editPassword");
      $triggerEditPasswordButton = this.$("#triggerEditPassword p");
      $cancelEditPassword = this.$("#cancelEditPassword");
      $submitNewPassword = this.$("#submitNewPassword");
      $triggerEditPasswordButton.fadeOut(animationTime / 2, function() {
        return $submitNewPassword.fadeIn(animationTime / 2);
      });
      $cancelEditPassword.delay(animationTime / 2).fadeIn(animationTime / 2);
      $el.animate({
        paddingLeft: 622
      }, animationTime);
      return $editPassword.delay(100).fadeIn(animationTime - 100, function() {
        return $editPassword.find("input").first().focus();
      });
    },
    _hidePasswordFields: function() {
      var $cancelEditPassword, $editPassword, $el, $inputs, $submitNewPassword, $triggerEditPasswordButton, animationTime;
      animationTime = 300;
      $el = this.$el;
      $editPassword = this.$("#editPassword");
      $inputs = $editPassword.find("input");
      $triggerEditPasswordButton = this.$("#triggerEditPassword p");
      $cancelEditPassword = this.$("#cancelEditPassword");
      $submitNewPassword = this.$("#submitNewPassword");
      $submitNewPassword.fadeOut(animationTime / 2, function() {
        $triggerEditPasswordButton.fadeIn(animationTime / 2);
        return $inputs.val("");
      });
      $cancelEditPassword.fadeOut(animationTime / 2);
      $el.animate({
        paddingLeft: 222
      }, animationTime);
      return $editPassword.fadeOut(animationTime);
    },
    _saveNewPassword: function() {
      var currentPassword, newPassword, self;
      if (this._isInputValid()) {
        currentPassword = this.$("#currentPassword").val();
        newPassword = this.$("#newPasswordFirst").val();
        self = this;
        return $.ajax({
          url: "clients/changepassword",
          type: "put",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
          }),
          success: function() {
            self._hidePasswordFields();
            return notificationcenter.notify("views.client.config.changePassword.success");
          },
          error: function() {
            return notificationcenter.notify("views.client.config.changePassword.oldPasswordWrong");
          }
        });
      } else {
        return notificationcenter.notify("views.client.config.changePassword.invalidInput");
      }
    },
    _updateSubmitButton: function() {
      var $submitNewPassword;
      $submitNewPassword = this.$("#submitNewPassword");
      return $submitNewPassword.toggleClass("valid", this._isInputValid());
    },
    _isInputValid: function() {
      var currentPassword, newPasswordFirst, newPasswordSecond;
      currentPassword = this.$("#currentPassword").val();
      newPasswordFirst = this.$("#newPasswordFirst").val();
      newPasswordSecond = this.$("#newPasswordSecond").val();
      if (currentPassword.length < 8 || newPasswordFirst.length < 8 || newPasswordSecond.length < 8) {
        return false;
      }
      if (newPasswordFirst !== newPasswordSecond) {
        return false;
      }
      return true;
    },
    _checkEnterKey: function(e) {
      if (e.keyCode === 13) {
        return this._saveNewPassword();
      }
    },
    destroy: function() {
      return this.stopListening();
    }
  });
});

/*
//@ sourceMappingURL=ProfileView.js.map
*/