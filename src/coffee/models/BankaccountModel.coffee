define ["underscore", "backbone", "services/notificationcenter"], (_, Backbone, notificationcenter) ->

  BankaccountModel = Backbone.Model.extend

    defaults:
      name: ""
      bic: ""
      iban: ""

    initialize: ->
      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.bankaccountModel.invalid",
          error: error

    urlRoot: "bankaccounts"

    validate: (attributes) ->
      return "name"  if attributes.name is ""
      return "bic"  if attributes.bic is ""
      "iban"  if attributes.iban is ""

