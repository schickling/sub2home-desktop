define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/client/config/BankaccountTemplate.html"
], ($, _, Backbone, notificationcenter, BankaccountTemplate) ->
  
  BankaccountView = Backbone.View.extend

    template: _.template(BankaccountTemplate)

    events:
      "focusout input": "_update"

    initialize: ->
      @_render()

    _render: ->
      @$el.html @template(@model.toJSON())

    _update: (e) ->
      $input = $(e.target)
      field = $input.attr("data-field")
      val = $input.val()
      
      # check if value really changed
      if val isnt @model.get(field)
        @model.set field, val
        @model.save {},
          success: ->
            notificationcenter.notify "views.client.config.bankaccount.success"

          error: ->
            notificationcenter.notify "views.client.config.bankaccount.error"

