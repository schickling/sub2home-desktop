define [
  "underscore"
  "backbone"
], (_, Backbone) ->

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

    parse: (response) ->
      if response
        if response.hasOwnProperty("phone")
          phone = response.phone
          firstDigit = parseInt(String(phone).charAt(0), 10)
          response.phone = "0" + phone  if firstDigit > 0 and firstDigit <= 9
        response

    validate: (attributes) ->
      return "firstName"   if attributes.hasOwnProperty("firstName") and attributes.firstName is ""
      return "lastName"   if attributes.hasOwnProperty("lastName") and attributes.lastName is ""
      return "street"   if attributes.hasOwnProperty("street") and attributes.street is ""
      return "postal"   if attributes.hasOwnProperty("postal") and attributes.postal < 10000 or attributes.postal > 99999
      return "city"   if attributes.hasOwnProperty("city") and attributes.city is ""
      return "phone"   if attributes.hasOwnProperty("phone") and not @_validatePhone(attributes.phone)
      return "email"   if attributes.hasOwnProperty("email") and not @_validateEmail(attributes.email)

    _validateEmail: (email) ->
      re = /^(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+)?$/
      re.test email

    _validatePhone: (phone) ->
      re = /^0(\d){2,}(\s|-|\/)?(\s|\d){3,}$/
      re.test phone
