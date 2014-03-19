define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/home/ItemsView"
  "text!templates/store/home/CategoryTemplate.html"
], ($, _, Backbone, ItemsView, CategoryTemplate) ->

  CategoryView = Backbone.View.extend

    className: "category"

    template: _.template(CategoryTemplate)

    initialize: ->
      @render()

    render: ->
      json = title: @model.get "title"
      @$el.html @template(json)
      itemsView = new ItemsView
        collection: @model.get "itemsCollection"
        el: @$(".items")


