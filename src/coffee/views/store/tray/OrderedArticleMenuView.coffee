define [
  "jquery"
  "underscore"
  "backbone"
  "services/imageSuffixer"
  "text!templates/store/tray/OrderedArticleMenuTemplate.html"
], ($, _, Backbone, imageSuffixer, OrderedArticleMenuTemplate) ->

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
      @$el.addClass imageSuffixer.getClass(@model.get("largeImage"))

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


