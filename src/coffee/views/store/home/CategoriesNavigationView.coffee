define [
  "jquery"
  "underscore"
  "backbone"
  "collections/TimelineItemsCollection"
  "views/store/shared/timeline/TimelineBaseView"
], ($, _, Backbone, TimelineItemsCollection, TimelineBaseView) ->

  CategoriesNavigationView = Backbone.View.extend

    timelineItemsCollection: null
    currentCategoryIndex: 0
    animationTime: 400
    
    # to prevent calculation while triggered scrolling
    scrollListnening: true
    
    # cached dom
    $content: null
    $categories: null
    $navigation: null
    $navigationStage: null
    $navigationOverlay: null
    $navigationOverlayWrapper: null
    $navigationItems: null
    initialize: ->
      @_prepareTimelineItems()
      @_render()
      
      # dom needs to be cached AFTER rendering
      @_cacheDom()
      @_initializeClickListneres()
      @_initializeScrollListneres()

    _cacheDom: ->
      
      # content
      @$content = @$(".content")
      @$categories = @$content.find("#categories").children()
      
      # navigation
      @$navigation = @$("#categoriesNavigation")
      @$navigationStage = @$navigation.find("#stageTimeline")
      @$navigationItems = @$navigationStage.find(".itemTimeline")
      @$navigationOverlay = @$navigation.find("#overlayTimeline")
      @$navigationOverlayWrapper = @$navigationOverlay.find("#overlayFrameWrapperTimeline")

    _prepareTimelineItems: ->
      @timelineItemsCollection = new TimelineItemsCollection()
      _.each @collection.models, ((categoryModel) ->
        @timelineItemsCollection.add
          image: categoryModel.get("smallImage")
          icon: categoryModel.get("icon")

      ), this

    _render: ->
      new TimelineBaseView(
        el: @$("#categoriesNavigation")
        collection: @timelineItemsCollection
      )

    _initializeClickListneres: ->
      self = this
      @$navigationItems.each (index) ->
        $this = $(this)
        $this.on "click", ->
          self.currentCategoryIndex = index
          self._navigate()


    _initializeScrollListneres: ->
      self = this
      $content = @$content
      $categories = @$categories
      antepenultimate = $categories.length - 3
      currentIndex = undefined
      timer = undefined
      
      # Bind to scroll
      $content.on "scroll", ->
        
        # navigation
        if self.scrollListnening
          
          # wrap in timeout to buffer events
          clearTimeout timer
          timer = setTimeout(->
            currentIndex = -1
            $categories.each ->
              currentIndex++  if $(this).position().top < 90

            
            # check if bottom reached
            currentIndex++  if currentIndex > antepenultimate and currentIndex < ($categories.length - 1) and $content.scrollTop() is $content[0].scrollHeight - $content.height()
            self.currentCategoryIndex = currentIndex
            self._slideTimeline()
          , 20)


    _navigate: ->
      @_slideTimeline()
      @_scrollContent()

    _slideTimeline: ->
      offsetRelative = @currentCategoryIndex * 70
      @$navigationOverlay.stop().animate
        left: offsetRelative - 10
      , @animationTime
      @$navigationOverlayWrapper.stop().animate
        left: -offsetRelative
      , @animationTime

    _scrollContent: ->
      $currentCategory = @$categories.eq(@currentCategoryIndex)
      self = this
      @scrollListnening = false
      @$content.stop().animate
        scrollTop: $currentCategory.position().top + @$content.scrollTop() - 10
      , @animationTime, ->
        self.scrollListnening = true

