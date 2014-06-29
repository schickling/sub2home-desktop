define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/client/config/AddressTemplate.html"
], ($, _, Backbone, notificationcenter, AddressTemplate) ->
 
  AddressView = Backbone.View.extend

    template: _.template(AddressTemplate)
    
    events:
      "focusout input": "_update"

    initialize: ->
      @_render()

    _render: ->
      json =
        firstName: @model.get("firstName")
        lastName: @model.get("lastName")
        street: @model.get("street")
        streetNumber: @model.get("streetNumber")
        streetAdditional: @model.get("streetAdditional")
        city: @model.get("city")
        district: @model.get("district")
        phone: @model.get("phone")
        email: @model.get("email")
        postal: @model.get("postal")
        company: @model.get("company")

      @$el.html @template(json)

    _update: (e) ->
      $input = $(e.target)
      field = $input.attr("data-field")
      val = $input.val()
      
      # check if value really changed
      if val isnt @model.get(field)
        @model.set field, val
        @model.save {},
          success: ->
            notificationcenter.notify "views.client.config.address.success"

          error: ->
            notificationcenter.notify "views.client.config.address.error"

