define ["underscore", "backbone", "models/AddressModel", "models/BankaccountModel", "collections/StoresCollection"], (_, Backbone, AddressModel, BankaccountModel, StoresCollection) ->

  ClientModel = Backbone.Model.extend

    defaults:
      bankaccountModel: null
      storesCollection: null
      addressModel: null
      number: 0

    urlRoot: "clients"

    parse: (response) ->
      if response.hasOwnProperty("storesCollection")
        response.storesCollection = new StoresCollection(response.storesCollection,
          parse: true
        )
      if response.hasOwnProperty("addressModel")
        response.addressModel = new AddressModel(response.addressModel,
          parse: true
        )
      response.bankaccountModel = new BankaccountModel(response.bankaccountModel)  if response.hasOwnProperty("bankaccountModel")
      response

    getName: ->
      addressModel = @get("addressModel")
      addressModel.get("firstName") + " " + addressModel.get("lastName")

  clientModel = new ClientModel()
  clientModel.fetch async: false

  clientModel
