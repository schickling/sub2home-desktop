define ["jquery", "underscore", "backbone", "services/notificationcenter"], ($, _, Backbone, notificationcenter) ->

  AuthentificationModel = Backbone.Model.extend

    defaults:
      isSetup: false
      isLoggedIn: false

    _hasValidToken: ->

      # validate token
      valid = false
      self = this
      $.ajax
        url: "checktoken"
        type: "post"
        async: false
        dataType: "text" # needed because response is empty
        success: ->
          valid = true

        error: ->
          self._dropToken()

      valid

    _setupAjax: ->

      # append token to all api requests to authenticate
      $.ajaxSetup headers:
        Token: @_getToken()

      @_isSetup = true

    forceSSL: ->
      window.location.href = "https:" + window.location.href.substring(window.location.protocol.length)  if location.protocol isnt "https:"

    isLoggedIn: ->

      # check for cache
      return true  if @get("isLoggedIn")

      # check if even a token is in localstorage
      return false  unless @_getToken()
      @_setupAjax()  unless @_isSetup

      # force ssl
      @forceSSL()

      # validate token
      tokenIsValid = @_hasValidToken()

      # cache token validation
      @set "isLoggedIn", tokenIsValid
      tokenIsValid

    login: (number, password) ->

      # force ssl
      @forceSSL()
      isLoggedIn = false
      self = this
      $.ajax
        url: "login"
        data: JSON.stringify(
          number: number
          password: password
        )
        type: "post"
        async: false
        dataType: "json"
        contentType: "application/json; charset=utf-8"
        success: (response) ->
          self._setToken response.token
          isLoggedIn = true

        error: (jqXHR) ->
          statusCode = jqXHR.status
          if statusCode is 429
            notificationcenter.notify "models.authentificationModel.tooManyErrors"
          else
            notificationcenter.notify "models.authentificationModel.dataWrong"

      @_setupAjax()
      @set "isLoggedIn", isLoggedIn
      isLoggedIn

    logout: ->

      # force ssl
      @forceSSL()
      isLoggedOut = false
      self = this
      $.ajax
        url: "logout"
        type: "post"
        async: false
        dataType: "text" # needed because response is empty
        success: (token) ->
          self._dropToken()
          isLoggedOut = true

      @set "isLoggedIn", not isLoggedOut
      isLoggedOut

    _setToken: (token) ->
      window.localStorage.setItem "token", token

    _getToken: ->
      window.localStorage.getItem "token"

    _dropToken: ->
      window.localStorage.removeItem "token"

  new AuthentificationModel()
