define(["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/cartModel"], function($, _, Backbone, router, notificationcenter, cartModel) {
  var TimelineControllerView;
  return TimelineControllerView = Backbone.View.extend({
    currentTimelineItemModel: null,
    previousTimelineItemModel: null,
    currentTimelineItemIndex: 0,
    currentInfoIndex: 0,
    animationTime: 400,
    delayTimeout: null,
    $buttonNext: null,
    $buttonPrev: null,
    $buttonCart: null,
    $stage: null,
    $infoContainer: null,
    $timelineOverlay: null,
    $timelineOverlayWrapper: null,
    $timelineContainerWrapper: null,
    $timelineStage: null,
    $timelineCart: null,
    $noUpgrade: null,
    $stageOverlay: null,
    $pulseButtons: true,
    events: {
      "click #bNext": "_forward",
      "click .ingredientCategory.isSingle .ingredient": "_delayedForward",
      "fetched .article, .menuUpgrade": "_forward",
      "click #bPrev": "_backward",
      "click #bCart": "_finish",
      "click .iCart": "_finish",
      "click #noUpgrade": "_finish"
    },
    initialize: function() {
      var self;
      this._chacheDOM();
      this._initializeCurrentTimelineItem();
      self = this;
      $(document).on("keyup", function(e) {
        return self._evalKeyboardInput(e);
      });
      this._adjustButtons();
      this._initializeInfo();
      this._initializeTimeline();
      this._initializeListeners();
      this._slideNoUpgradeView();
      this._adjustStageOverlay();
      return this._initializePulseButtons();
    },
    _chacheDOM: function() {
      var $overlay;
      $overlay = this.$("#overlay");
      this.$buttonNext = $overlay.find("#bNext");
      this.$buttonPrev = $overlay.find("#bPrev");
      this.$buttonCart = $overlay.find("#bCart");
      this.$stage = this.$("#stage");
      this.$stageOverlay = this.$("#overlay");
      this.$noUpgrade = this.$stage.find("#noUpgrade");
      this.$infoContainer = this.$("#infoContainer");
      this.$timelineContainerWrapper = this.$("#timelineContainerWrapper");
      this.$timelineOverlay = this.$("#overlayTimeline");
      this.$timelineOverlayWrapper = this.$timelineOverlay.find("#overlayFrameWrapperTimeline");
      this.$timelineStage = this.$("#stageTimeline");
      return this.$timelineCart = this.$timelineStage.find(".iCart");
    },
    _initializeCurrentTimelineItem: function() {
      this.currentTimelineItemModel = this.collection.where({
        isDisabled: false
      })[0];
      return this.currentTimelineItemIndex = this.collection.indexOf(this.currentTimelineItemModel);
    },
    _initializeInfo: function() {
      var $currentInfo;
      $currentInfo = this.$infoContainer.find(".info").first();
      return $currentInfo.addClass("active").show();
    },
    _initializeTimeline: function() {
      var $currentTimelineItem, timelineOffsetRelative;
      this.$timelineOverlayWrapper.width(this.$timelineStage.width());
      $currentTimelineItem = this.$timelineStage.find(".itemTimeline").eq(this.currentTimelineItemIndex);
      timelineOffsetRelative = $currentTimelineItem.position().left;
      this.currentTimelineItemModel.set("wasVisited", true);
      this.$timelineOverlay.css({
        left: timelineOffsetRelative - 10
      }).show();
      return this.$timelineOverlayWrapper.css({
        left: -timelineOffsetRelative
      });
    },
    _initializeListeners: function() {
      var self;
      _.each(this.collection.models, (function(timelineItemModel) {
        return this._listenToTimelineItem(timelineItemModel);
      }), this);
      this.listenTo(this.collection, "add", function(timelineItemModel) {
        return this._listenToTimelineItem(timelineItemModel);
      });
      this.listenTo(this.collection, "add remove", this._adjustButtons);
      self = this;
      return $(window).resize(function() {
        return self._slideStage();
      });
    },
    _listenToTimelineItem: function(timelineItemModel) {
      return this.listenTo(timelineItemModel, "change", function() {
        var isComplete;
        if (timelineItemModel.hasChanged("isActive") && timelineItemModel.get("isActive")) {
          this.currentTimelineItemModel.set("isActive", false);
          this._setCurrentTimelineItem(timelineItemModel);
          this.currentTimelineItemIndex = this.collection.indexOf(timelineItemModel);
          this._navigate();
        }
        isComplete = this.model.isComplete();
        this.$timelineCart.toggleClass("clickable", isComplete);
        return this.$buttonCart.toggleClass("clickable", isComplete);
      });
    },
    _adjustButtons: function() {
      var $buttonCart, $buttonNext, $buttonPrev, animationTime, noUpgradeViewIsActive;
      animationTime = this.animationTime / 2;
      noUpgradeViewIsActive = this._noUpgradeViewIsActive();
      $buttonNext = this.$buttonNext;
      $buttonPrev = this.$buttonPrev;
      $buttonCart = this.$buttonCart;
      $buttonNext.stop(true).fadeOut(animationTime, function() {
        if (noUpgradeViewIsActive) {
          return $buttonNext.css({
            right: 321
          });
        } else {
          return $buttonNext.css({
            right: 20
          });
        }
      });
      $buttonPrev.stop(true).fadeOut(animationTime);
      $buttonCart.stop(true).fadeOut(animationTime);
      if (this._checkForward()) {
        $buttonNext.delay(animationTime).fadeIn(animationTime);
      } else {
        if (!this._noUpgradeViewIsActive()) {
          $buttonCart.delay(animationTime).fadeIn(animationTime);
        }
      }
      if (this._checkBackward()) {
        return $buttonPrev.delay(animationTime).fadeIn(animationTime);
      }
    },
    _alignTimeline: function() {
      var adjustedRelativeProgress, left, relativeProgress, relativeWidth, totalWidth, wrapperWidth;
      relativeProgress = this.currentTimelineItemIndex / this.collection.length;
      adjustedRelativeProgress = relativeProgress * relativeProgress;
      totalWidth = this.$timelineStage.width();
      wrapperWidth = this.$timelineContainerWrapper.width();
      relativeWidth = totalWidth - wrapperWidth / 2;
      left = relativeWidth * adjustedRelativeProgress;
      return this.$timelineContainerWrapper.stop().animate({
        scrollLeft: left
      });
    },
    _evalKeyboardInput: function(e) {
      var keyCode;
      keyCode = e.keyCode;
      if (keyCode === 37) {
        return this._backward();
      } else if (keyCode === 39 || keyCode === 32) {
        return this._forward();
      } else {
        if (keyCode === 13) {
          return this._finish();
        }
      }
    },
    _forward: function() {
      var currentTimelineItemModel;
      if (this._checkForward()) {
        this.currentTimelineItemIndex++;
        currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
        if (currentTimelineItemModel.get("isDisabled")) {
          return this._forward();
        } else {
          this._setCurrentTimelineItem(currentTimelineItemModel);
          this._transferActiveState();
          return this._navigate();
        }
      }
    },
    _delayedForward: function() {
      var _this = this;
      clearTimeout(this.delayTimeout);
      return this.delayTimeout = setTimeout(function() {
        return _this._forward();
      }, 500);
    },
    _backward: function() {
      var currentTimelineItemModel;
      if (this._checkBackward()) {
        this.currentTimelineItemIndex--;
        currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
        if (currentTimelineItemModel.get("isDisabled")) {
          return this._backward();
        } else {
          this._setCurrentTimelineItem(currentTimelineItemModel);
          this._transferActiveState();
          return this._navigate();
        }
      }
    },
    _navigate: function() {
      this._slideStage();
      this._slideTimeline();
      this._changeInfo();
      this._adjustButtons();
      return this._alignTimeline();
    },
    _slideStage: function() {
      var documentWidth, factor, filteredCollection;
      filteredCollection = this.collection.filter(function(timelineItemModel, index) {
        return (index < this.currentTimelineItemIndex) && !timelineItemModel.get("isDisabled");
      }, this);
      factor = filteredCollection.length;
      documentWidth = this.$el.width();
      this.$stage.stop().animate({
        left: -(factor * documentWidth)
      }, 600);
      return this._slideNoUpgradeView();
    },
    _slideNoUpgradeView: function() {
      if (this._hasNoUpgradeView()) {
        if (this._noUpgradeViewIsActive()) {
          return this.$noUpgrade.stop().animate({
            right: 0
          }, 200);
        } else {
          if (this.$noUpgrade.css("right") !== "-301px") {
            return this.$noUpgrade.stop().animate({
              right: -301
            }, 200);
          }
        }
      }
    },
    _slideTimeline: function() {
      var $currentTimelineItem, self, timelineOffsetRelative;
      $currentTimelineItem = this.$timelineStage.find(".itemTimeline").eq(this.currentTimelineItemIndex);
      timelineOffsetRelative = $currentTimelineItem.position().left;
      self = this;
      this.$timelineOverlay.stop().animate({
        left: timelineOffsetRelative - 10
      }, this.animationTime, function() {
        return self.currentTimelineItemModel.set("wasVisited", true);
      });
      return this.$timelineOverlayWrapper.stop().animate({
        left: -timelineOffsetRelative
      }, this.animationTime);
    },
    _changeInfo: function() {
      var $container, animationTime, newInfoIndex, self;
      newInfoIndex = this._getInfoIndex();
      self = this;
      if (this.currentInfoIndex !== newInfoIndex) {
        this.currentInfoIndex = newInfoIndex;
        animationTime = this.animationTime;
        $container = this.$infoContainer;
        return $container.stop().animate({
          marginTop: -($container.height()) + 35
        }, animationTime, function() {
          var $currentInfo, $prevInfo;
          $prevInfo = $container.find(".active");
          $currentInfo = $container.find(".info").eq(newInfoIndex);
          $prevInfo.removeClass("active").hide();
          $currentInfo.addClass("active").show();
          $container.css({
            marginTop: -($currentInfo.height()) + 35
          });
          $container.stop().animate({
            marginTop: 0
          }, animationTime);
          return self._adjustStageOverlay();
        });
      }
    },
    _getInfoIndex: function() {
      var currentSelectionIndex, infoIndex, lastSelectionIndex;
      infoIndex = this.currentTimelineItemIndex;
      lastSelectionIndex = void 0;
      currentSelectionIndex = void 0;
      _.each(this.collection.models, (function(timelineItemModel, index) {
        if (index <= this.currentTimelineItemIndex) {
          currentSelectionIndex = timelineItemModel.get("selectionIndex");
          if (currentSelectionIndex === lastSelectionIndex) {
            infoIndex--;
          }
          return lastSelectionIndex = currentSelectionIndex;
        }
      }), this);
      if (this.model.canBeUpgraded()) {
        infoIndex--;
      }
      return infoIndex;
    },
    _adjustStageOverlay: function() {
      var $info, infoHeight, slideContainerHeight, timelineHeight;
      timelineHeight = 90;
      $info = this.$infoContainer.find(".active");
      infoHeight = $info.height();
      slideContainerHeight = window.innerHeight - infoHeight - timelineHeight;
      return this.$stageOverlay.animate({
        top: infoHeight + slideContainerHeight / 2
      });
    },
    _finish: function() {
      var lockedTimelineItems;
      lockedTimelineItems = this.collection.where({
        isLocked: true
      });
      if (lockedTimelineItems.length === 0) {
        return this._saveOrderedItemModel();
      } else {
        _.each(lockedTimelineItems, function(timelineItemModel) {
          return timelineItemModel.trigger("highlight");
        });
        return notificationcenter.notify("views.store.selection.notReady");
      }
    },
    _saveOrderedItemModel: function() {
      if (!this.model.get("isInCart")) {
        cartModel.addOrderedItemModel(this.model);
        return router.navigate("store", {
          trigger: true,
          replace: true
        });
      } else {
        return router.navigate("store/tablett", true);
      }
    },
    destroy: function() {
      $(document).off("keyup");
      this.$pulseNextButton = false;
      return this.stopListening();
    },
    _setCurrentTimelineItem: function(currentTimelineItemModel) {
      this.previousTimelineItemModel = this.currentTimelineItemModel;
      return this.currentTimelineItemModel = currentTimelineItemModel;
    },
    _transferActiveState: function() {
      this.previousTimelineItemModel.set({
        isActive: false
      }, {
        silent: true
      });
      return this.currentTimelineItemModel.set({
        isActive: true
      }, {
        silent: true
      });
    },
    _checkForward: function() {
      var filteredCollection;
      if ((this.collection.length - 1) <= this.currentTimelineItemIndex) {
        return false;
      }
      filteredCollection = this.collection.filter(function(timelineItemModel, index) {
        return (index > this.currentTimelineItemIndex) && !timelineItemModel.get("isDisabled");
      }, this);
      return filteredCollection.length > 0;
    },
    _checkBackward: function() {
      var filteredCollection;
      if (this.currentTimelineItemIndex <= 0) {
        return false;
      }
      filteredCollection = this.collection.filter(function(timelineItemModel, index) {
        return (index < this.currentTimelineItemIndex) && !timelineItemModel.get("isDisabled");
      }, this);
      return filteredCollection.length > 0;
    },
    _hasNoUpgradeView: function() {
      return this.$noUpgrade !== null;
    },
    _noUpgradeViewIsActive: function() {
      return this._hasNoUpgradeView() && this.currentTimelineItemModel.get("menuUpgradeSelection");
    },
    _initializePulseButtons: function() {
      this.$pulseButtons = true;
      return this._pulseButtons("");
    },
    _pulseButtons: function(currentPulseClass) {
      var pulseClass, that;
      pulseClass = "pulse";
      that = this;
      if (currentPulseClass === pulseClass) {
        this.$buttonNext.removeClass(pulseClass);
        this.$buttonCart.removeClass(pulseClass);
        currentPulseClass = "";
      } else {
        this.$buttonNext.addClass(pulseClass);
        this.$buttonCart.addClass(pulseClass);
        currentPulseClass = pulseClass;
      }
      if (this.$pulseButtons) {
        return setTimeout((function() {
          return that._pulseButtons(currentPulseClass);
        }), 1500);
      }
    }
  });
});
