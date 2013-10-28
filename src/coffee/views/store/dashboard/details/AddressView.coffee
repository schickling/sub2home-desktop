define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/AddressTemplate.html"
], ($, _, Backbone, AddressTemplate) ->

  AddressView = Backbone.View.extend

    template: _.template(AddressTemplate)

    initialize: ->
      @_render()

    _render: ->
      json =
        firstName: @model.get("firstName")
        lastName: @model.get("lastName")
        street: @model.get("street")
        streetNumber: @model.get("streetNumber")
        streetAdditional: @model.get("streetAdditional")
        postal: @model.get("postal")
        city: @model.get("city")
        district: @model.get("district")
        email: @model.get("email")
        phone: @model.get("phone")

      @$el.html @template(json)

