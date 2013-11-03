define [
  "jquery"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "models/authentificationModel"
  "models/stateModel"
  "views/PageView"
  "text!templates/client/login/MainTemplate.html"
], ($, _, Backbone, router, notificationcenter, authentificationModel, stateModel, PageView, MainTemplate) ->

  MainView = PageView.extend

    pageTitle: "Einloggen - sub2home"

    $number: null
    $password: null
    $submit: null
    loginAllowed: false

    events:
      "keyup #login input": "_evalKeyboard"
      "click #loginSubmit": "_login"

    initialize: ->
      authentificationModel.forceSSL()
      @_render()
      @_cacheDom()
      @$number.focus()

    _cacheDom: ->
      @$number = @$("#loginCustomerNumber")
      @$password = @$("#loginPassword")
      @$submit = @$("#loginSubmit")

    _render: ->
      @$el.html MainTemplate
      @append()

    _login: ->
      unless @loginAllowed
        notificationcenter.notify "models.authentificationModel.dataWrong"
        return
      number = @$number.val()
      password = @$password.val()
      loginSucceded = undefined
      loginSucceded = authentificationModel.login(number, password)
      if loginSucceded
        router.navigate "dashboard",
          trigger: true
          replace: true


    _evalKeyboard: (e) ->
      
      # listen for enter
      if e.keyCode is 13
        @_login()
        return
      number = @$number.val()
      password = @$password.val()
      
      # highlight submit button
      if number and number.length is 4 and password and password.length >= 8
        @$submit.stop().animate opacity: 1
        @loginAllowed = true
      else
        @$submit.stop().animate opacity: 0.5
        @loginAllowed = false

