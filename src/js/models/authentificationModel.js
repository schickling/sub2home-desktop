define(["jquery", "underscore", "backbone", "services/notificationcenter"], function($, _, Backbone, notificationcenter) {
  var AuthentificationModel;
  AuthentificationModel = Backbone.Model.extend({
    defaults: {
      isSetup: false,
      isLoggedIn: false
    },
    _hasValidToken: function() {
      var self, valid;
      valid = false;
      self = this;
      $.ajax({
        url: "checktoken",
        type: "post",
        async: false,
        dataType: "text",
        success: function() {
          return valid = true;
        },
        error: function() {
          return self._dropToken();
        }
      });
      return valid;
    },
    _setupAjax: function() {
      $.ajaxSetup({
        headers: {
          Token: this._getToken()
        }
      });
      return this._isSetup = true;
    },
    forceSSL: function() {
      if (location.protocol !== "https:") {
        return window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
      }
    },
    isLoggedIn: function() {
      var tokenIsValid;
      if (this.get("isLoggedIn")) {
        return true;
      }
      if (!this._getToken()) {
        return false;
      }
      if (!this._isSetup) {
        this._setupAjax();
      }
      this.forceSSL();
      tokenIsValid = this._hasValidToken();
      this.set("isLoggedIn", tokenIsValid);
      return tokenIsValid;
    },
    login: function(number, password) {
      var isLoggedIn, self;
      this.forceSSL();
      isLoggedIn = false;
      self = this;
      $.ajax({
        url: "login",
        data: JSON.stringify({
          number: number,
          password: password
        }),
        type: "post",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(response) {
          self._setToken(response.token);
          return isLoggedIn = true;
        },
        error: function(jqXHR) {
          var statusCode;
          statusCode = jqXHR.status;
          if (statusCode === 429) {
            return notificationcenter.notify("models.authentificationModel.tooManyErrors");
          } else {
            return notificationcenter.notify("models.authentificationModel.dataWrong");
          }
        }
      });
      this._setupAjax();
      this.set("isLoggedIn", isLoggedIn);
      return isLoggedIn;
    },
    logout: function() {
      var isLoggedOut, self;
      this.forceSSL();
      isLoggedOut = false;
      self = this;
      $.ajax({
        url: "logout",
        type: "post",
        async: false,
        dataType: "text",
        success: function(token) {
          self._dropToken();
          return isLoggedOut = true;
        }
      });
      this.set("isLoggedIn", !isLoggedOut);
      return isLoggedOut;
    },
    _setToken: function(token) {
      return window.localStorage.setItem("token", token);
    },
    _getToken: function() {
      return window.localStorage.getItem("token");
    },
    _dropToken: function() {
      return window.localStorage.removeItem("token");
    }
  });
  return new AuthentificationModel();
});
