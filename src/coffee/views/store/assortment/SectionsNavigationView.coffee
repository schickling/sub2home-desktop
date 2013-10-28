define [
  "jquery"
  "underscore"
  "backbone"
  "collections/TimelineItemsCollection"
  "views/store/shared/timeline/TimelineBaseView"
], ($, _, Backbone, TimelineItemsCollection, TimelineBaseView) ->

  SectionsNavigationView = Backbone.View.extend

    timelineItemsCollection: null
    currentSectionIndex: 0
    animationTime: 400

    # to prevent calculation while triggered scrolling
    scrollListnening: true

    # cached dom
    $stage: null
    $slides: null
    $navigation: null
    $navigationStage: null
    $navigationOverlay: null
    $navigationOverlayWrapper: null
    $navigationItems: null
    $assortmentControls: null
    initialize: ->
      @_prepareTimelineItems()
      @_render()

      # dom needs to be cached AFTER rendering
      @_cacheDom()
      @_initializeClickListneres()

    _prepareTimelineItems: ->
      timelineItems = [
        {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/categories/smallimages/sub.png"
          icon: "iSub"
        }
        {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menuupgrade.png"
          icon: "iMenuUpgrade"
        }
        {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menubundle.png"
          icon: "iMenuBundle"
        }
        {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/ingredientcategories/smallimages/vegetables.png"
          icon: "iVegetables"
        }
      ]
      @timelineItemsCollection = new TimelineItemsCollection(timelineItems)

    _cacheDom: ->

      # stage
      @$stage = @$("#stage")
      @$slides = @$stage.children()

      # navigation
      @$navigation = @$("#sectionsNavigation")
      @$navigationStage = @$navigation.find("#stageTimeline")
      @$navigationItems = @$navigationStage.find(".itemTimeline")
      @$navigationOverlay = @$navigation.find("#overlayTimeline")
      @$navigationOverlayWrapper = @$navigationOverlay.find("#overlayFrameWrapperTimeline")

      # assortment controls
      @$assortmentControls = @$(".assortmentControls")

    _render: ->
      new TimelineBaseView(
        el: @$("#sectionsNavigation")
        collection: @timelineItemsCollection
      )

    _initializeClickListneres: ->
      self = this
      @$navigationItems.each (index) ->
        $this = $(this)
        $this.on "click", ->
          self.currentSectionIndex = index
          self._navigate()



    _navigate: ->
      @_slideTimeline()
      @_slideContent()
      @_changeControlView()

    _slideTimeline: ->
      offsetRelative = @currentSectionIndex * 70
      @$navigationOverlay.stop().animate
        left: offsetRelative - 10
      , @animationTime
      @$navigationOverlayWrapper.stop().animate
        left: -offsetRelative
      , @animationTime

    _slideContent: ->
      left = -(@currentSectionIndex * 100)
      leftPercentage = left + "%"
      @$stage.animate left: leftPercentage

    _changeControlView: ->
      $newControl = @$assortmentControls.eq(@currentSectionIndex)
      $oldControls = @$assortmentControls.not($newControl)
      $oldControls.hide()
      $newControl.show()

