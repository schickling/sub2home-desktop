define ["jquery", "underscore", "backbone", "services/router", "services/notificationcenter", "models/cartModel"], ($, _, Backbone, router, notificationcenter, cartModel) ->

  TimelineControllerView = Backbone.View.extend

    #
    #    * this.$el: $('.main')
    #    *
    #    * model: orderedItemModel
    #    *
    #    * this.collection: all timeline items
    #
    currentTimelineItemModel: null
    previousTimelineItemModel: null
    currentTimelineItemIndex: 0
    currentInfoIndex: 0
    animationTime: 400
    delayTimeout: null

    # cached dom
    $buttonNext: null
    $buttonPrev: null
    $buttonCart: null
    $stage: null
    $infoContainer: null
    $timelineOverlay: null
    $timelineOverlayWrapper: null
    $timelineContainerWrapper: null
    $timelineStage: null
    $timelineCart: null
    $noUpgrade: null
    $stageOverlay: null
    $pulseButtons: true
    events:

      # buttons
      "click #bNext": "_forward"
      "click .ingredientCategory.isSingle .ingredient": "_delayedForward"
      "fetched .article, .menuUpgrade": "_forward"
      "click #bPrev": "_backward"
      "click #bCart": "_finish"

      # timeline
      "click .iCart": "_finish"

      # stage
      "click #noUpgrade": "_finish"

    initialize: ->

      # cache DOM
      @_chacheDOM()

      # initialize currentTimelineItemModel
      @_initializeCurrentTimelineItem()

      # bind keyboard input
      self = this
      $(document).on "keyup", (e) ->
        self._evalKeyboardInput e


      # initialize ui buttons
      @_adjustButtons()

      # initialize info header
      @_initializeInfo()

      # initialize timeline
      @_initializeTimeline()

      # initialize listeners
      @_initializeListeners()

      # show no upgrade view if is first slide
      @_slideNoUpgradeView()

      # compensate content overlayls
      
      @_adjustStageOverlay()

      # initializie pulse button
      @_initializePulseButtons()

    _chacheDOM: ->

      # ui buttons in overlay
      $overlay = @$("#overlay")
      @$buttonNext = $overlay.find("#bNext")
      @$buttonPrev = $overlay.find("#bPrev")
      @$buttonCart = $overlay.find("#bCart")

      # stage
      @$stage = @$("#stage")
      @$stageOverlay = @$("#overlay")
      @$noUpgrade = @$stage.find("#noUpgrade")

      # info note
      @$infoContainer = @$("#infoContainer")

      # timeline
      @$timelineContainerWrapper = @$("#timelineContainerWrapper")
      @$timelineOverlay = @$("#overlayTimeline")
      @$timelineOverlayWrapper = @$timelineOverlay.find("#overlayFrameWrapperTimeline")
      @$timelineStage = @$("#stageTimeline")
      @$timelineCart = @$timelineStage.find(".iCart")

    _initializeCurrentTimelineItem: ->

      # get first enabled item
      @currentTimelineItemModel = @collection.where(isDisabled: false)[0]

      # set index
      @currentTimelineItemIndex = @collection.indexOf(@currentTimelineItemModel)

    _initializeInfo: ->
      $currentInfo = @$infoContainer.find(".info").first()
      $currentInfo.addClass("active").show()

    _initializeTimeline: ->

      # set width of overlay wrapper
      @$timelineOverlayWrapper.width @$timelineStage.width()

      # get current item and calculate relative and total offset
      $currentTimelineItem = @$timelineStage.find(".itemTimeline").eq(@currentTimelineItemIndex)
      timelineOffsetRelative = $currentTimelineItem.position().left

      # mark current timeline item as wasVisited
      @currentTimelineItemModel.set "wasVisited", true

      # align timeline overlay
      @$timelineOverlay.css(left: timelineOffsetRelative - 10).show()

      # align timeline overlay wrapper
      @$timelineOverlayWrapper.css left: -timelineOffsetRelative

    _initializeListeners: ->

      # listen if items get active
      _.each @collection.models, ((timelineItemModel) ->
        @_listenToTimelineItem timelineItemModel
      ), this

      # also listen to new items if they get active
      @listenTo @collection, "add", (timelineItemModel) ->
        @_listenToTimelineItem timelineItemModel


      # adjust buttons on collection change
      @listenTo @collection, "add remove", @_adjustButtons

      # adjust stage offset on resize
      self = this
      $(window).resize ->
        self._slideStage()



    # listen if timeline item gets isSelected and thus active
    _listenToTimelineItem: (timelineItemModel) ->
      @listenTo timelineItemModel, "change", ->
        if timelineItemModel.hasChanged("isActive") and timelineItemModel.get("isActive")

          # deactivate prev timeline item
          @currentTimelineItemModel.set "isActive", false

          # set new timeline item
          @_setCurrentTimelineItem timelineItemModel
          @currentTimelineItemIndex = @collection.indexOf(timelineItemModel)

          # _navigate
          @_navigate()
        isComplete = @model.isComplete()
        @$timelineCart.toggleClass "clickable", isComplete
        @$buttonCart.toggleClass "clickable", isComplete


    _adjustButtons: ->
      animationTime = @animationTime / 2
      noUpgradeViewIsActive = @_noUpgradeViewIsActive()
      $buttonNext = @$buttonNext
      $buttonPrev = @$buttonPrev
      $buttonCart = @$buttonCart

      # hide all buttons
      $buttonNext.stop(true).fadeOut animationTime, ->
        if noUpgradeViewIsActive
          $buttonNext.css right: 321
        else
          $buttonNext.css right: 20

      $buttonPrev.stop(true).fadeOut animationTime
      $buttonCart.stop(true).fadeOut animationTime

      # next/cart button
      if @_checkForward()
        $buttonNext.delay(animationTime).fadeIn animationTime
      else $buttonCart.delay(animationTime).fadeIn animationTime  unless @_noUpgradeViewIsActive()

      # prev button
      $buttonPrev.delay(animationTime).fadeIn animationTime  if @_checkBackward()

    _alignTimeline: ->
      relativeProgress = @currentTimelineItemIndex / @collection.length
      adjustedRelativeProgress = relativeProgress * relativeProgress
      totalWidth = @$timelineStage.width()
      wrapperWidth = @$timelineContainerWrapper.width()
      relativeWidth = totalWidth - wrapperWidth / 2
      left = relativeWidth * adjustedRelativeProgress
      @$timelineContainerWrapper.stop().animate scrollLeft: left

    _evalKeyboardInput: (e) ->

      # cache keyCode
      keyCode = e.keyCode
      if keyCode is 37 # left arrow
        @_backward()
      else if keyCode is 39 or keyCode is 32 # right arrow or spacebar
        @_forward()
      # enter
      else @_finish()  if keyCode is 13

    _forward: ->
      if @_checkForward()
        @currentTimelineItemIndex++
        currentTimelineItemModel = @collection.at(@currentTimelineItemIndex)
        if currentTimelineItemModel.get("isDisabled")

          # call recrusive
          @_forward()
        else
          @_setCurrentTimelineItem currentTimelineItemModel
          @_transferActiveState()
          @_navigate()

    _delayedForward: ->
      clearTimeout @delayTimeout
      @delayTimeout = setTimeout(() =>
        @_forward()
      , 500)

    _backward: ->
      if @_checkBackward()
        @currentTimelineItemIndex--
        currentTimelineItemModel = @collection.at(@currentTimelineItemIndex)
        if currentTimelineItemModel.get("isDisabled")

          # call recrusive
          @_backward()
        else
          @_setCurrentTimelineItem currentTimelineItemModel
          @_transferActiveState()
          @_navigate()

    _navigate: ->
      @_slideStage()
      @_slideTimeline()
      @_changeInfo()
      @_adjustButtons()
      @_alignTimeline()

    _slideStage: ->

      # adjust index to skip isDisabled items and thus non exsisting slides
      filteredCollection = @collection.filter((timelineItemModel, index) ->
        (index < @currentTimelineItemIndex) and not timelineItemModel.get("isDisabled")
      , this)
      factor = filteredCollection.length
      documentWidth = @$el.width()

      # animate
      @$stage.stop().animate
        left: -(factor * documentWidth)
      , 600
      @_slideNoUpgradeView()


    # hook in for no menu upgrade
    _slideNoUpgradeView: ->
      if @_hasNoUpgradeView()

        # no upgrade slide in
        if @_noUpgradeViewIsActive()
          @$noUpgrade.stop().animate
            right: 0
          , 200
        else

          # check if still visible
          if @$noUpgrade.css("right") isnt "-301px"
            @$noUpgrade.stop().animate
              right: -301
            , 200

    _slideTimeline: ->
      $currentTimelineItem = @$timelineStage.find(".itemTimeline").eq(@currentTimelineItemIndex)
      timelineOffsetRelative = $currentTimelineItem.position().left
      self = this
      @$timelineOverlay.stop().animate
        left: timelineOffsetRelative - 10
      , @animationTime, ->
        self.currentTimelineItemModel.set "wasVisited", true

      @$timelineOverlayWrapper.stop().animate
        left: -timelineOffsetRelative
      , @animationTime

    _changeInfo: ->
      newInfoIndex = @_getInfoIndex()
      self = this

      # compare timeline items
      if @currentInfoIndex isnt newInfoIndex
        @currentInfoIndex = newInfoIndex
        animationTime = @animationTime
        $container = @$infoContainer

        # slide up
        $container.stop().animate
          marginTop: -($container.height()) + 35
        , animationTime, ->

          # swap content
          $prevInfo = $container.find(".active")
          $currentInfo = $container.find(".info").eq(newInfoIndex)
          $prevInfo.removeClass("active").hide()
          $currentInfo.addClass("active").show()
          $container.css marginTop: -($currentInfo.height()) + 35

          # slide down
          $container.stop().animate
            marginTop: 0
          , animationTime

          # compensate content overlay
          self._adjustStageOverlay()


    _getInfoIndex: ->
      infoIndex = @currentTimelineItemIndex
      lastSelectionIndex = undefined
      currentSelectionIndex = undefined
      _.each @collection.models, ((timelineItemModel, index) ->
        if index <= @currentTimelineItemIndex
          currentSelectionIndex = timelineItemModel.get("selectionIndex")
          infoIndex--  if currentSelectionIndex is lastSelectionIndex
          lastSelectionIndex = currentSelectionIndex
      ), this
      infoIndex--  if @model.canBeUpgraded()
      infoIndex

    _adjustStageOverlay: ->
      timelineHeight = 90
      $info = @$infoContainer.find(".active")
      infoHeight = $info.height()
      slideContainerHeight = window.innerHeight - infoHeight - timelineHeight
      @$stageOverlay.animate top: infoHeight + slideContainerHeight / 2

    _finish: ->
      lockedTimelineItems = @collection.where(isLocked: true)
      if lockedTimelineItems.length is 0
        @_saveOrderedItemModel()
      else
        _.each lockedTimelineItems, (timelineItemModel) ->
          timelineItemModel.trigger "highlight"

        notificationcenter.notify "views.store.selection.notReady"

    _saveOrderedItemModel: ->
      unless @model.get("isInCart")

        # save ordered item in cart
        cartModel.addOrderedItemModel @model

        # back to store.home
        router.navigate "store",
          trigger: true
          replace: true

      else

        # back to store.tray
        router.navigate "store/tablett", true

    destroy: ->
      $(document).off "keyup"
      @$pulseNextButton = false
      @stopListening()


    #
    #    * helper functions
    #
    _setCurrentTimelineItem: (currentTimelineItemModel) ->
      @previousTimelineItemModel = @currentTimelineItemModel
      @currentTimelineItemModel = currentTimelineItemModel

    _transferActiveState: ->
      @previousTimelineItemModel.set
        isActive: false
      ,
        silent: true

      @currentTimelineItemModel.set
        isActive: true
      ,
        silent: true


    _checkForward: ->

      # end of list
      return false  if (@collection.length - 1) <= @currentTimelineItemIndex

      # look if enabled items with higher index exists
      filteredCollection = @collection.filter((timelineItemModel, index) ->
        (index > @currentTimelineItemIndex) and not timelineItemModel.get("isDisabled")
      , this)
      filteredCollection.length > 0

    _checkBackward: ->

      # beginning of list
      return false  if @currentTimelineItemIndex <= 0

      # look if enabled items with lower index exists
      filteredCollection = @collection.filter((timelineItemModel, index) ->
        (index < @currentTimelineItemIndex) and not timelineItemModel.get("isDisabled")
      , this)
      filteredCollection.length > 0

    _hasNoUpgradeView: ->
      @$noUpgrade isnt null

    _noUpgradeViewIsActive: ->
      @_hasNoUpgradeView() and @currentTimelineItemModel.get("menuUpgradeSelection")

    _initializePulseButtons: ->
      @$pulseButtons = true
      @_pulseButtons ""

    _pulseButtons: (currentPulseClass) ->
      pulseClass = "pulse"
      that = this
      if currentPulseClass is pulseClass
        @$buttonNext.removeClass pulseClass
        @$buttonCart.removeClass pulseClass
        currentPulseClass = ""
      else
        @$buttonNext.addClass pulseClass
        @$buttonCart.addClass pulseClass
        currentPulseClass = pulseClass
      if @$pulseButtons
        setTimeout (->
          that._pulseButtons currentPulseClass
        ), 1500
