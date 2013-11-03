define [
  "jquery"
  "underscore"
  "backbone"
  "collections/CategoriesCollection"
  "views/store/home/CategoryView"
], ($, _, Backbone, CategoriesCollection, CategoryView) ->

  CategoriesView = Backbone.View.extend
    
    # needed for categories navigation view in mainview
    deffered: null
    initialize: ->
      self = this
      @collection = new CategoriesCollection()
      
      # set deffered
      @deffered = @collection.fetch(
        parse: true
        success: ->
          self.render()
      )

    render: ->
      _.each @collection.models, ((categoryModel) ->
        @renderCategory categoryModel
      ), this

    renderCategory: (categoryModel) ->
      categoryView = new CategoryView(model: categoryModel)
      @$el.append categoryView.el

