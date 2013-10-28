define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/client/config/ProfileTemplate.html"
], ($, _, Backbone, notificationcenter, ProfileTemplate) ->

  ProfileView = Backbone.View.extend

    template: _.template(ProfileTemplate)

    events:
      "click #triggerEditPassword p": "_showPasswordFields"
      "click #submitNewPassword": "_saveNewPassword"
      "click #cancelEditPassword": "_hidePasswordFields"
      "keyup #editPassword input": "_updateSubmitButton"
      "keypress #editPassword input": "_checkEnterKey"

    initialize: ->
      @_render()
      @_listenToNameChange()

    _render: ->
      addressModel = @model.get("addressModel")
      json =
        name: addressModel.get("firstName") + " " + addressModel.get("lastName")
        number: @model.get("number")

      @$el.html @template(json)

    _listenToNameChange: ->
      addressModel = @model.get("addressModel")
      @listenTo addressModel, "change:firstName change:lastName", @_render

    _showPasswordFields: ->
      animationTime = 300
      $el = @$el
      $editPassword = @$("#editPassword")
      $triggerEditPasswordButton = @$("#triggerEditPassword p")
      $cancelEditPassword = @$("#cancelEditPassword")
      $submitNewPassword = @$("#submitNewPassword")
      $triggerEditPasswordButton.fadeOut animationTime / 2, ->
        $submitNewPassword.fadeIn animationTime / 2

      $cancelEditPassword.delay(animationTime / 2).fadeIn animationTime / 2
      $el.animate
        paddingLeft: 622
      , animationTime
      $editPassword.delay(100).fadeIn animationTime - 100, ->
        $editPassword.find("input").first().focus()


    _hidePasswordFields: ->
      animationTime = 300
      $el = @$el
      $editPassword = @$("#editPassword")
      $inputs = $editPassword.find("input")
      $triggerEditPasswordButton = @$("#triggerEditPassword p")
      $cancelEditPassword = @$("#cancelEditPassword")
      $submitNewPassword = @$("#submitNewPassword")
      $submitNewPassword.fadeOut animationTime / 2, ->
        $triggerEditPasswordButton.fadeIn animationTime / 2
        
        # clear inputs
        $inputs.val ""

      $cancelEditPassword.fadeOut animationTime / 2
      $el.animate
        paddingLeft: 222
      , animationTime
      $editPassword.fadeOut animationTime

    _saveNewPassword: ->
      if @_isInputValid()
        currentPassword = @$("#currentPassword").val()
        newPassword = @$("#newPasswordFirst").val()
        self = this
        $.ajax
          url: "clients/changepassword"
          type: "put"
          contentType: "application/json; charset=utf-8"
          dataType: "json"
          data: JSON.stringify(
            currentPassword: currentPassword
            newPassword: newPassword
          )
          success: ->
            self._hidePasswordFields()
            notificationcenter.notify "views.client.config.changePassword.success"

          error: ->
            notificationcenter.notify "views.client.config.changePassword.oldPasswordWrong"

      else
        notificationcenter.notify "views.client.config.changePassword.invalidInput"

    _updateSubmitButton: ->
      $submitNewPassword = @$("#submitNewPassword")
      $submitNewPassword.toggleClass "valid", @_isInputValid()

    _isInputValid: ->
      currentPassword = @$("#currentPassword").val()
      newPasswordFirst = @$("#newPasswordFirst").val()
      newPasswordSecond = @$("#newPasswordSecond").val()
      return false  if currentPassword.length < 8 or newPasswordFirst.length < 8 or newPasswordSecond.length < 8
      return false  if newPasswordFirst isnt newPasswordSecond
      true

    _checkEnterKey: (e) ->
      @_saveNewPassword()  if e.keyCode is 13

    destroy: ->
      @stopListening()

