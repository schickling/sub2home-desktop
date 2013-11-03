define [
  "jquery"
  "underscore"
  "backbone"
  "collections/MenuBundlesCollection"
  "views/store/assortment/SectionBaseView"
  "views/store/assortment/menuBundles/MenuBundleView"
  "views/store/assortment/menuBundles/ControlView"
], ($, _, Backbone, MenuBundlesCollection, SectionBaseView, MenuBundleView, ControlView) ->

  MenuBundlesView = SectionBaseView.extend

    controlViewClass: ControlView
    collectionClass: MenuBundlesCollection
    className: "menuBundles"

    _fetchCollection: ->
      self = this
      @collection.fetch success: ->
        self._renderContent()

    _renderContent: ->
      _.each @collection.models, ((menuBundleModel) ->
        @_renderMenuBundle menuBundleModel
      ), this

    _renderMenuBundle: (menuBundleModel) ->
      menuBundleView = new MenuBundleView(model: menuBundleModel)
      @$content.append menuBundleView.el

