define(["jquery", "jqueryRotate", "underscore", "backbone", "services/notificationcenter", "services/postalOracle", "text!templates/shared/misc/PostalSearchTemplate.html"], function($, jqueryRotate, _, Backbone, notificationcenter, postalOracle, PostalSearchTemplate) {
  var PostalSearchView;
  return PostalSearchView = Backbone.View.extend({
    events: {
      "input #locationSelectionInput": "_checkInput"
    },
    $input: null,
    $location: null,
    $locationLoader: null,
    $locationLabel: null,
    $deliveryAreaLabel: null,
    $storeSelectionLabel: null,
    postal: null,
    rotateInterval: null,
    initialize: function() {
      this._render();
      return this._cacheDom();
    },
    run: function() {
      var postal;
      postal = postalOracle.getPostal();
      if (postal) {
        this._hideRotateLocation();
        return this.setPostal(postal);
      } else {
        return this._checkLocation();
      }
    },
    showDeliveryAreaLabel: function() {
      this.$locationLabel.removeClass("active");
      this.$storeSelectionLabel.removeClass("active");
      return this.$deliveryAreaLabel.addClass("active");
    },
    showStoreSelectionLabel: function() {
      this.$locationLabel.removeClass("active");
      this.$storeSelectionLabel.addClass("active");
      return this.$deliveryAreaLabel.removeClass("active");
    },
    setPostal: function(postal) {
      postal = parseInt(postal, 10);
      if (postal !== this.postal) {
        this.trigger("newPostal", postal);
      }
      if (postalOracle.getPostal() !== postal) {
        postalOracle.setPostal(postal);
      }
      this.$input.val(postal);
      return this.postal = postal;
    },
    destroy: function() {
      return this._stopLocationDetermination();
    },
    _render: function() {
      return this.$el.html(PostalSearchTemplate);
    },
    _cacheDom: function() {
      this.$input = this.$("#locationSelectionInput");
      this.$deliveryAreaLabel = this.$("#deliveryAreaLabel");
      this.$storeSelectionLabel = this.$("#storeSelectionLabel");
      this.$location = this.$("#location");
      this.$locationLoader = this.$("#locationLoader");
      return this.$locationLabel = this.$("#locationLabel");
    },
    _checkLocation: function() {
      var _this = this;
      this._startRotateLocation();
      return postalOracle.calculate((function() {
        notificationcenter.notify("views.home.home.lookupLocation");
        _this._stopAndFadeOutRotateLocation();
        _this._focusSearch();
        return _this.setPostal(postalOracle.getPostal());
      }), function() {
        _this._stopAndFadeOutRotateLocation();
        return _this._focusSearch();
      });
    },
    _focusSearch: function() {
      return this.$input.focus();
    },
    _unfocusSearch: function() {
      return this.$input.blur();
    },
    _checkInput: function(e) {
      var postal;
      this._stopLocationDetermination();
      postal = e.target.value.replace(/[^0-9]/, "");
      this.$input.val(postal);
      if (postal.length < 5) {
        return;
      }
      if (this._isValidPostal(postal)) {
        return this.setPostal(postal);
      } else {
        return this.$input.val(this.postal);
      }
    },
    _isValidPostal: function(postal) {
      return postal > 9999 && postal < 100000;
    },
    _hideRotateLocation: function() {
      return this.$locationLoader.removeClass("active");
    },
    _stopLocationDetermination: function() {
      this._stopAndFadeOutRotateLocation();
      return postalOracle.cancel();
    },
    _startRotateLocation: function() {
      var $location, deg;
      $location = this.$location;
      deg = 0;
      return this.rotateInterval = setInterval(function() {
        deg = (deg + 5) % 180;
        return $location.rotate(deg);
      }, 20);
    },
    _stopAndFadeOutRotateLocation: function() {
      clearInterval(this.rotateInterval);
      return this._hideRotateLocation;
    }
  });
});
