define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/tray/OrderedArticleMenuTemplate.html"
], ($, _, Backbone, OrderedArticleMenuTemplate) ->

  OrderedArticleMenuView = Backbone.View.extend

    #
    #		 * this.model: ArticleModel
    #
    template: _.template(OrderedArticleMenuTemplate)
    className: "menuItem"

    initialize: ->
      @_render()

    _render: ->
      json =
        title: @model.get("title")
        image: @model.get("largeImage")
        info: @model.get("info")
        description: @_getDescription()

      @$el.html @template(json)
      @$el.addClass @_getImageClass()

    _getImageClass: ->
      image = @model.get("largeImage")
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."))
      imageWithoutFileExtension.split("-").pop()

    _getDescription: ->
      description = @model.get("description")
      if @model.hasIngredients()
        ingredientCategoriesCollection = @model.get("ingredientCategoriesCollection")
        ingredientModels = ingredientCategoriesCollection.getAllSelectedIngredientModels()
        i = 0

        while i < ingredientModels.length
          ingredientTitle = ingredientModels[i].get("shortTitle")
          if i > 0

            # if penulitmate ingredient
            if i is ingredientModels.length - 1
              description += " und " + ingredientTitle
            else
              description += ", " + ingredientTitle
          else
            description = ingredientTitle
          i++
      description


