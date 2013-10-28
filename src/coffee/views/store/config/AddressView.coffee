define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/config/AddressTemplate.html"
], ($, _, Backbone, notificationcenter, AddressTemplate) ->
  
  AddressView = Backbone.View.extend

    events:
      "focusout input": "_update"

    template: _.template(AddressTemplate)

    initialize: ->
      @_render()

    _render: ->
      addressModel = @model.get("addressModel")
      json =
        firstName: addressModel.get("firstName")
        lastName: addressModel.get("lastName")
        street: addressModel.get("street")
        streetNumber: addressModel.get("streetNumber")
        streetAdditional: addressModel.get("streetAdditional")
        city: addressModel.get("city")
        district: addressModel.get("district")
        phone: addressModel.get("phone")
        email: addressModel.get("email")
        postal: addressModel.get("postal")

      @$el.html @template(json)

    _update: (e) ->
      storeModel = @model
      addressModel = @model.get("addressModel")
      $input = $(e.target)
      field = $input.attr("data-field")
      val = $input.val()
      shouldReloadStoreModel = _.contains([
        "street"
        "postal"
        "city"
      ], field)
      
      # check if value really changed
      if val isnt addressModel.get(field)
        addressModel.set field, val
        addressModel.save {},
          success: ->
            notificationcenter.notify "views.store.config.address.success"
            
            # reload store if address got changed
            storeModel.fetch()  if shouldReloadStoreModel

          error: ->
            notificationcenter.notify "views.store.config.address.error"

