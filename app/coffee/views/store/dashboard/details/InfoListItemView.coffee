define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/InfoListItemTemplate.html"
], ($, _, Backbone, InfoListItemTemplate) ->

  InfoView = Backbone.View.extend

    template: _.template(InfoListItemTemplate)
    tagName: 'li'

    initialize: ->
      @_render()

    _render: ->
      json =
        isMenu: @model.isMenu()
        title: @_getItemTitle()
        itemString: @_getItemString()
        total: @model.get "total"
        amount: @model.get "amount"

      @$el.html @template(json)

    _getItemTitle: ->
      if @model.isMenu()
        @model.getMenuTitle()
      else
        orderedArticleModel = @model.get("orderedArticlesCollection").first()
        articleModel = orderedArticleModel.get "articleModel"
        articleModel.get "title"

    _getItemString: ->
      itemString = ""
      orderedArticlesCollection = @model.get("orderedArticlesCollection")
      orderedArticlesCollection.each (orderedArticleModel, index) ->
        articleModel = orderedArticleModel.get "articleModel"
        articleTitle = articleModel.get "title"
        categoryModel = articleModel.get "categoryModel"
        categoryTitle = categoryModel.title # category model not parsed because of circular dep issue
        itemString += "<span class=\"cat\">#{categoryTitle}</span> #{articleTitle}"

        ingredientCategoriesCollection = articleModel.get "ingredientCategoriesCollection"
        if ingredientCategoriesCollection
          ingredientCategoriesCollection.each (ingredientsCategory) ->
            ingredientsCollection = ingredientsCategory.get "ingredientsCollection"
            ingredientsCollection.each (ingredientModel) ->
              if ingredientModel.get("price") > 0
                shortcut = ingredientModel.get "shortcut"
                itemString += " <span class=\"extra\">#{shortcut}</span>"

        if index isnt orderedArticlesCollection.length - 1
          itemString += ", "

      itemString
