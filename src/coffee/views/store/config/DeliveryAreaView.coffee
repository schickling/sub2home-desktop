define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/config/DeliveryAreaTemplate.html"
], ($, _, Backbone, notificationcenter, DeliveryAreaTemplate) ->
  DeliveryAreaView = Backbone.View.extend

    events:
      "focusout .deliveryAreaMinimumDuration": "_updateMinimumDuration"
      "focusout .deliveryAreaMinimumValue": "_updateMinimumValue"
      "focusout .deliveryAreaPostal": "_updatePostal"
      "focusout .deliveryAreaCity": "_updateCity"
      "focusout .deliveryAreaDistrict": "_updateDistrict"
      "keypress input": "_blurOnEnter"
      "click .bRemove": "_destroy"

    initialize: ->
      @_render()

    _render: ->
      @$el.html _.template(DeliveryAreaTemplate, @model.toJSON())

    _destroy: ->
      self = this
      @model.destroy success: ->
        self.$el.fadeOut ->
          self.remove()



    _updateMinimumDuration: ->
      $input = @$(".deliveryAreaMinimumDuration")
      minimumDuration = parseInt($input.val(), 10)
      @_updateModel minimumDuration: minimumDuration

    _updateMinimumValue: ->
      $input = @$(".deliveryAreaMinimumValue")
      minimumValue = parseFloat($input.val())
      @_updateModel minimumValue: minimumValue
      $input.val minimumValue.toFixed(2)

    _updatePostal: ->
      $input = @$(".deliveryAreaPostal")
      postal = parseInt($input.val(), 10)
      @_updateModel postal: postal

    _updateCity: ->
      $input = @$(".deliveryAreaCity")
      city = $input.val()
      @_updateModel city: city

    _updateDistrict: ->
      $input = @$(".deliveryAreaDistrict")
      district = $input.val()
      @_updateModel district: district

    _blurOnEnter: (e) ->
      return  unless e.keyCode is 13
      $input = $(e.target)
      $input.blur()

    _updateModel: (changedAttributes) ->
      self = this
      @model.save changedAttributes,
        validate: true
        success: ->
          notificationcenter.notify "views.store.config.deliveryArea.change.success"

        error: ->
          notificationcenter.notify "views.store.config.deliveryArea.change.error"
          
          # rerender
          self._render()

