define ["underscore", "backbone", "collections/IngredientsCollection"], (_, Backbone, IngredientsCollection) ->

  IngredientCategoryModel = Backbone.Model.extend

    defaults:
      ingredientsCollection: null
      isMandatory: false
      isSingle: false
      title: ""
      image: ""
      icon: ""

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.ingredientsCollection = attributes.ingredientsCollection.toJSON()  if @get("ingredientsCollection")
      attributes

    parse: (response) ->
      response.ingredientsCollection = new IngredientsCollection(response.ingredientsCollection)  if response.hasOwnProperty("ingredientsCollection") and response.ingredientsCollection isnt null
      response

    initialize: ->
      @set ingredientsCollection: new IngredientsCollection()  unless @get("ingredientsCollection")

    isComplete: ->
      isComplete = true
      if @get("isMandatory")
        isComplete = false
        @get("ingredientsCollection").each (ingredientModel) ->
          isComplete = true  if ingredientModel.get("isSelected")
      isComplete

