define [
  "jquery"
  "jqueryLazyload"
  "underscore"
  "backbone"
  "models/stateModel"
  "views/PageView"
  "views/store/home/MessageView"
  "views/store/home/DeliveryPopupView"
  "views/store/home/DeliveryView"
  "views/store/home/CategoriesView"
  "views/store/home/CategoriesNavigationView"
  "text!templates/store/home/MainTemplate.html"
], ($, jqueryLazyload, _, Backbone, stateModel, PageView, MessageView, DeliveryPopupView, DeliveryView, CategoriesView, CategoriesNavigationView, MainTemplate) ->

  MainView = PageView.extend

    template: _.template(MainTemplate)

    events:
      "click #currentDeliveryArea": "_renderDeliveryPopupView"

    initialize: ->
      # set page title
      @model = stateModel.get("storeModel")
      @pageTitle = "SUBWAY® " + @model.get("title") + " - sub2home"
      @_render()

    _render: ->
      json = 
        title: @model.get("title")
      @$el.html(this.template(json))
      @$("#storeClosed").toggle(not @model.get("isOpen"))
      @_renderMessageView()
      @_renderDeliveryPopupView()  unless @model.get("deliveryAreaWasSelected")
      @_renderDeliveryView()
      @_renderCategories()

    _renderMessageView: ->
      if @model.get("isMessageActive") and @model.get("messageText") isnt ""
        new MessageView(
          el: @$("#infoNote")
          model: @model
          )

    _renderDeliveryPopupView: ->
      new DeliveryPopupView(
        el: @$("#preSelectDeliveryArea")
        model: @model
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

