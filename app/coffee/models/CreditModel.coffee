define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->

  CreditModel = Backbone.Model.extend

    defaults:
      isAccepted: false
      description: ""
      total: 0
