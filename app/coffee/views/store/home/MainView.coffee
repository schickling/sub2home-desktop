define ["jquery", "jqueryLazyload", "underscore", "backbone", "models/stateModel", "views/PageView", "views/store/home/DeliveryPopupView", "views/store/home/DeliveryView", "views/store/home/CategoriesView", "views/store/home/CategoriesNavigationView", "text!templates/store/home/MainTemplate.html"], ($, jqueryLazyload, _, Backbone, stateModel, PageView, DeliveryPopupView, DeliveryView, CategoriesView, CategoriesNavigationView, MainTemplate) ->

  MainView = PageView.extend

    events:
      "click #currentDeliveryArea": "_renderDeliveryPopupView"

    initialize: ->
      # set page title
      storeModel = stateModel.get("storeModel")
      @pageTitle = "SUBWAY® " + storeModel.get("title") + " - sub2home"
      @_render()

    _render: ->
      @$el.html MainTemplate
      @_renderDeliveryPopupView()  unless stateModel.get("storeModel").get("deliveryAreaWasSelected")
      @_renderDeliveryView()
      @_renderCategories()

    _renderDeliveryPopupView: ->
      new DeliveryPopupView(
        el: @$("#preSelectDeliveryArea")
        model: stateModel.get("storeModel")
      )

    _renderDeliveryView: ->
      new DeliveryView(el: @$("#storeDeliveryDetails"))

    _renderCategories: ->
      self = this
      $content = @$(".content")
      $categories = $content.find("#categories")
      categoriesView = new CategoriesView(el: $categories)

      # render navigation
      categoriesView.deffered.done ->
        categoriesNavigationView = new CategoriesNavigationView(
          collection: categoriesView.collection
          el: self.$el
        )
        self.append()

        # activate image lazy loading
        $content.lazyload()

