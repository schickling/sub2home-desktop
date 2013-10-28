define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/authentificationModel", "models/stateModel", "views/PageView", "text!templates/client/login/MainTemplate.html"], function($, _, Backbone, router, notificationcenter, authentificationModel, stateModel, PageView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    pageTitle: "Einloggen - sub2home",
    $number: null,
    $password: null,
    $submit: null,
    loginAllowed: false,
    events: {
      "keyup #login input": "_evalKeyboard",
      "click #loginSubmit": "_login"
    },
    initialize: function() {
      authentificationModel.forceSSL();
      this._render();
      this._cacheDom();
      return this.$number.focus();
    },
    _cacheDom: function() {
      this.$number = this.$("#loginCustomerNumber");
      this.$password = this.$("#loginPassword");
      return this.$submit = this.$("#loginSubmit");
    },
    _render: function() {
      this.$el.html(MainTemplate);
      return this.append();
    },
    _login: function() {
      var loginSucceded, number, password;
      if (!this.loginAllowed) {
        notificationcenter.notify("models.authentificationModel.dataWrong");
        return;
      }
      number = this.$number.val();
      password = this.$password.val();
      loginSucceded = void 0;
      loginSucceded = authentificationModel.login(number, password);
      if (loginSucceded) {
        return router.navigate("dashboard", {
          trigger: true,
          replace: true
        });
      }
    },
    _evalKeyboard: function(e) {
      var number, password;
      if (e.keyCode === 13) {
        this._login();
        return;
      }
      number = this.$number.val();
      password = this.$password.val();
      if (number && number.length === 4 && password && password.length >= 8) {
        this.$submit.stop().animate({
          opacity: 1
        });
        return this.loginAllowed = true;
      } else {
        this.$submit.stop().animate({
          opacity: 0.5
        });
        return this.loginAllowed = false;
      }
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/