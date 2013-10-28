define [
  "jquery"
  "underscore"
  "backbone"
  "collections/MenuUpgradesCollection"
  "views/store/assortment/SectionBaseView"
  "views/store/assortment/menuUpgrades/MenuUpgradeView"
  "views/store/assortment/menuUpgrades/ControlView"
], ($, _, Backbone, MenuUpgradesCollection, SectionBaseView, MenuUpgradeView, ControlView) ->

  MenuUpgradesView = SectionBaseView.extend

    controlViewClass: ControlView
    collectionClass: MenuUpgradesCollection
    className: "menuUpgrades"

    _fetchCollection: ->
      self = this
      @collection.fetch success: ->
        self._renderContent()

    _renderContent: ->
      _.each @collection.models, ((menuUpgradeModel) ->
        @_renderMenuUpgrade menuUpgradeModel
      ), this

    _renderMenuUpgrade: (menuUpgradeModel) ->
      menuUpgradeView = new MenuUpgradeView(model: menuUpgradeModel)
      @$content.append menuUpgradeView.el

