define(["jquery", "jqueryRotate", "underscore", "backbone", "services/notificationcenter", "collections/OrdersCollection", "views/store/dashboard/OrderView", "views/store/dashboard/CreditView", "text!templates/store/dashboard/NoOrdersTemplate.html"], function($, jqueryRotate, _, Backbone, notificationcenter, OrdersCollection, OrderView, CreditView, NoOrdersTemplate) {
  var OrdersView;
  return OrdersView = Backbone.View.extend({
    $orderListing: null,
    $ordersToday: null,
    $olderOrders: null,
    $search: null,
    $refresh: null,
    $loadMore: null,
    $noOrders: null,
    pageOffset: 0,
    search: "",
    autoRefreshInterval: null,
    rotateInterval: null,
    rotationDeg: 0,
    searchTimeout: null,
    isReady: true,
    hasOrders: false,
    creditView: null,
    events: {
      "keyup #search": "_delayedSearch",
      "click #refresh": "_refresh",
      "click #loadMore": "_loadMore",
      "click #bMail": "_sendTestOrder",
      mousemove: "_resetAutoRefresh",
      "click #checkAllOrders": "_checkAllOrders"
    },
    initialize: function() {
      this._createCreditView();
      this.collection = new OrdersCollection();
      this._cacheDom();
      this._fetchCollectionAndRender(true);
      return this._startAutoRefresh();
    },
    _createCreditView: function() {
      return this.creditView = new CreditView({
        el: this.$("#balanceOrder")
      });
    },
    _cacheDom: function() {
      this.$orderListing = this.$("#orderListing");
      this.$ordersToday = this.$("#ordersToday");
      this.$olderOrders = this.$("#olderOrders");
      this.$search = this.$("#search");
      this.$refresh = this.$("#refresh");
      this.$loadMore = this.$("#loadMore");
      return this.$noOrders = this.$("#noOrders");
    },
    _listenToCollection: function() {
      return this.listenTo(this.collection, "add remove", this._render);
    },
    _startAutoRefresh: function() {
      var self;
      self = this;
      return this.autoRefreshInterval = setInterval(function() {
        return self._fetchCollectionAndRender(true);
      }, 20000);
    },
    _resetAutoRefresh: function() {
      clearInterval(this.autoRefreshInterval);
      return this._startAutoRefresh();
    },
    _fetchCollectionAndRender: function(viewShouldBeResetted) {
      var self;
      self = this;
      if (this.isReady) {
        this.isReady = false;
        this._startRotateRefresh();
        if (viewShouldBeResetted) {
          this.pageOffset = 0;
        }
        return this.collection.fetch({
          parse: true,
          data: $.param({
            search: this.search,
            page: this.pageOffset
          }),
          success: function(collection, receivedOrders) {
            self._stopRotateRefresh();
            if (viewShouldBeResetted) {
              self._resetView();
            }
            self._renderOrders();
            if (receivedOrders.length === 0 || self.search) {
              self._hideLoadMore();
            } else {
              self._showLoadMore();
            }
            if (collection.length === 0 && !self.hasOrders) {
              self._showNoOrders();
            } else {
              self.hasOrders = true;
              self._showOrders();
            }
            return self.isReady = true;
          },
          error: function() {
            self._stopRotateRefresh();
            return self._renderNoOrders();
          }
        });
      }
    },
    _showOrders: function() {
      this.$orderListing.show();
      return this.$noOrders.hide();
    },
    _showNoOrders: function() {
      this.$orderListing.hide();
      if (this.$noOrders.is(":empty")) {
        this._renderNoOrders();
      }
      return this.$noOrders.show();
    },
    _renderOrders: function() {
      return _.each(this.collection.models, (function(orderModel) {
        return this._renderOrder(orderModel);
      }), this);
    },
    _renderOrder: function(orderModel) {
      var orderView;
      orderView = new OrderView({
        model: orderModel,
        creditView: this.creditView
      });
      if (orderModel.wasCreatedToday()) {
        return this.$ordersToday.append(orderView.el);
      } else {
        return this.$olderOrders.append(orderView.el);
      }
    },
    _renderNoOrders: function() {
      return this.$noOrders.html(NoOrdersTemplate);
    },
    _delayedSearch: function() {
      var self;
      self = this;
      clearTimeout(this.searchTimeout);
      return this.searchTimeout = setTimeout(function() {
        return self._search();
      }, 300);
    },
    _search: function() {
      this.search = this.$search.val();
      if (this.search) {
        this.$olderOrders.addClass("opaque");
      }
      this._hideLoadMore();
      return this._fetchCollectionAndRender(true);
    },
    _refresh: function() {
      this._clearSearch();
      return this._fetchCollectionAndRender(true);
    },
    _loadMore: function() {
      this.pageOffset++;
      this._clearSearch();
      return this._fetchCollectionAndRender(false);
    },
    _startRotateRefresh: function() {
      var $refresh, self;
      clearInterval(this.rotateInterval);
      $refresh = this.$refresh;
      self = this;
      return this.rotateInterval = setInterval(function() {
        self.rotationDeg = (self.rotationDeg + 15) % 180;
        return $refresh.rotate(self.rotationDeg);
      }, 20);
    },
    _stopRotateRefresh: function() {
      var checkInterval, self;
      self = this;
      return checkInterval = setInterval(function() {
        if (self.rotationDeg === 0) {
          clearInterval(self.rotateInterval);
          return clearInterval(checkInterval);
        }
      }, 10);
    },
    _resetView: function() {
      this.$olderOrders.removeClass("opaque");
      this.$ordersToday.empty();
      return this.$olderOrders.empty();
    },
    _hideLoadMore: function() {
      return this.$loadMore.fadeOut(100);
    },
    _showLoadMore: function() {
      return this.$loadMore.fadeIn(100);
    },
    _clearSearch: function() {
      this.$search.val("");
      return this.search = "";
    },
    _sendTestOrder: function() {
      var self;
      self = this;
      return $.ajax({
        url: "stores/storeAlias/testorder",
        type: "post",
        success: function() {
          notificationcenter.notify("views.store.dashboard.testOrder.success");
          return self._fetchCollectionAndRender();
        },
        error: function() {
          return notificationcenter.notify("views.store.dashboard.testOrder.error");
        }
      });
    },
    _checkAllOrders: function() {
      return _.each(this.collection.models, function(orderModel) {
        if (!orderModel.get("isDelivered")) {
          return orderModel.save({
            isDelivered: true
          });
        }
      });
    },
    destroy: function() {
      return clearInterval(this.autoRefreshInterval);
    }
  });
});

/*
//@ sourceMappingURL=OrdersView.js.map
*/