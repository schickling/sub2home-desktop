define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/stateModel"
  "collections/OrdersCollection"
  "views/store/dashboard/OrderView"
  "views/store/dashboard/CreditView"
  "text!templates/store/dashboard/NoOrdersTemplate.html"
], ($, _, Backbone, notificationcenter, stateModel, OrdersCollection, OrderView, CreditView, NoOrdersTemplate) ->

  OrdersView = Backbone.View.extend

    $orderListing: null
    $ordersToday: null
    $olderOrders: null
    $search: null
    $refresh: null
    $loadMore: null
    $noOrders: null

    # pagination counter
    pageOffset: 0

    # search value for fetching
    search: ""
    autoRefreshInterval: null
    rotateInterval: null
    rotationDeg: 0
    searchTimeout: null
    isReady: true

    # needed to indicate when to load noOrders view
    hasOrders: false
    creditView: null
    events:
      "keyup #search": "_delayedSearch"
      "click #refresh": "_refresh"
      "click #loadMore": "_loadMore"
      "click #bMail": "_sendTestOrder"
      "mousemove": "_resetAutoRefresh"
      "click #checkAllOrders": "_checkAllOrders"

    initialize: ->
      @_createCreditView()
      @collection = new OrdersCollection()
      @_cacheDom()
      @_fetchCollectionAndRender true
      @_startAutoRefresh()

    _createCreditView: ->
      @creditView = new CreditView(el: @$("#balanceOrder"))

    _cacheDom: ->
      @$orderListing = @$("#orderListing")
      @$ordersToday = @$("#ordersToday")
      @$olderOrders = @$("#olderOrders")
      @$search = @$("#search")
      @$refresh = @$("#refresh")
      @$loadMore = @$("#loadMore")
      @$noOrders = @$("#noOrders")

    _listenToCollection: ->
      @listenTo @collection, "add remove", @_render

    _startAutoRefresh: ->
      @autoRefreshInterval = setInterval =>
        @_fetchCollectionAndRender true
      , 20000

    _resetAutoRefresh: ->
      clearInterval @autoRefreshInterval
      @_startAutoRefresh()

    _fetchCollectionAndRender: (viewShouldBeResetted) ->
      if @isReady
        @isReady = false
        @_startRotateRefresh()

        # reset page offset
        @pageOffset = 0  if viewShouldBeResetted
        @collection.fetch
          parse: true
          data: $.param
            search: @search
            page: @pageOffset
          success: (collection, receivedOrders) =>
            @_stopRotateRefresh()
            @_resetView()  if viewShouldBeResetted
            @_renderOrders()
            if receivedOrders.length is 0 or @search
              @_hideLoadMore()
            else
              @_showLoadMore()
            if collection.length is 0 and not @hasOrders
              @_showNoOrders()
            else
              @hasOrders = true
              @_showOrders()
            @isReady = true
            storeModel = stateModel.get("storeModel")
            storeModel.fetch
              url: "stores/storeAlias/auth" # use custom route

          error: ->
            @_stopRotateRefresh()
            @_renderNoOrders()


    _showOrders: ->
      @$orderListing.show()
      @$noOrders.hide()

    _showNoOrders: ->
      @$orderListing.hide()

      # lazy load noOrders
      @_renderNoOrders()  if @$noOrders.is(":empty")
      @$noOrders.show()

    _renderOrders: ->
      _.each @collection.models, ((orderModel) ->
        @_renderOrder orderModel
      ), this

    _renderOrder: (orderModel) ->
      orderView = new OrderView(
        model: orderModel
        creditView: @creditView
      )
      if orderModel.wasCreatedToday()
        @$ordersToday.append orderView.el
      else
        @$olderOrders.append orderView.el

    _renderNoOrders: ->
      @$noOrders.html NoOrdersTemplate

    _delayedSearch: ->
      clearTimeout @searchTimeout
      @searchTimeout = setTimeout =>
        @_search()
      , 300

    _search: ->
      @search = @$search.val()
      @$olderOrders.addClass "opaque"  if @search
      @_hideLoadMore()
      @_fetchCollectionAndRender true

    _refresh: ->
      @_clearSearch()
      @_fetchCollectionAndRender true

    _loadMore: ->
      @pageOffset++
      @_clearSearch()
      @_fetchCollectionAndRender false

    _startRotateRefresh: ->

      # clean old interval
      clearInterval @rotateInterval
      $refresh = @$refresh
      @rotateInterval = setInterval =>
        @rotationDeg = (@rotationDeg + 15) % 180
        $refresh.transition rotate: "#{@rotationDeg}deg"
      , 20

    _stopRotateRefresh: ->
      # wait until rotation complete
      checkInterval = setInterval =>
        if @rotationDeg is 0
          clearInterval @rotateInterval
          clearInterval checkInterval
      , 10

    _resetView: ->
      @$olderOrders.removeClass "opaque"
      @$ordersToday.empty()
      @$olderOrders.empty()

    _hideLoadMore: ->
      @$loadMore.fadeOut 100

    _showLoadMore: ->
      @$loadMore.fadeIn 100

    _clearSearch: ->
      @$search.val ""
      @search = ""

    _sendTestOrder: ->
      $.ajax
        url: "stores/storeAlias/testorder"
        type: "post"
        success: =>
          notificationcenter.notify "views.store.dashboard.testOrder.success"
          @_fetchCollectionAndRender()

        error: ->
          notificationcenter.notify "views.store.dashboard.testOrder.error"


    _checkAllOrders: ->
      _.each @collection.models, (orderModel) ->
        unless orderModel.get("isDelivered")
          orderModel.save {
            isDelivered: true
          }, {
            success: ->
              storeModel = stateModel.get("storeModel")
              storeModel.fetch
                url: "stores/storeAlias/auth" # use custom route
          }


    destroy: ->
      clearInterval @autoRefreshInterval

