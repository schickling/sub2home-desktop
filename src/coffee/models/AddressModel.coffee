define ["underscore", "backbone", "services/notificationcenter"], (_, Backbone, notificationcenter) ->

  AddressModel = Backbone.Model.extend

    defaults:
      firstName: ""
      lastName: ""
      street: ""
      streetNumber: ""
      streetAdditional: ""
      city: ""
      district: ""
      phone: ""
      email: ""
      postal: 0

    urlRoot: "addresses"

    initialize: ->
      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.addressModel.invalid",
          error: error

    parse: (response) ->
      if response
        if response.hasOwnProperty("phone")
          phone = response.phone
          firstDigit = parseInt(String(phone).charAt(0), 10)
          response.phone = "0" + phone  if firstDigit > 0 and firstDigit <= 9
        response

    validate: (attributes) ->
      return "firstName"  if attributes.firstName is ""
      return "lastName"  if attributes.lastName is ""
      return "street"  if attributes.street is ""
      return "postal"  if attributes.postal < 10000 or attributes.postal > 99999
      return "city"  if attributes.city is ""
      return "phone"  unless @_validatePhone(attributes.phone)
      "email"  unless @_validateEmail(attributes.email)

    _validateEmail: (email) ->
      re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      re.test email

    _validatePhone: (phone) ->
      re = /^0(\d){2,}(\s|-|\/)?(\s|\d){3,}$/
      re.test phone
