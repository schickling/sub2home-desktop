define [
  "jquery"
  "underscore"
  "backbone"
  "collections/CategoriesCollection"
  "views/store/assortment/SectionBaseView"
  "views/store/assortment/articles/CategoryView"
  "views/store/assortment/articles/ControlView"
], ($, _, Backbone, CategoriesCollection, SectionBaseView, CategoryView, ControlView) ->

  CategoriesView = SectionBaseView.extend

    controlViewClass: ControlView
    collectionClass: CategoriesCollection
    className: "articles"

    _fetchCollection: ->
      self = this
      @collection.fetch
        url: "stores/storeAlias/categories/assortment" # use custom route
        success: ->
          self._renderContent()

    _renderContent: ->
      _.each @collection.models, ((categoryModel) ->
        @_renderCategory categoryModel
      ), this

    _renderCategory: (categoryModel) ->
      categoryView = new CategoryView(model: categoryModel)
      @$content.append categoryView.el


