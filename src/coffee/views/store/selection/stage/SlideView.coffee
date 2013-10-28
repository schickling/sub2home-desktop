define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  SlideView = Backbone.View.extend

    className: "slide"
    isScrollIconVisible: true
    $scrollIcon: null
    events:
      "click .showAll": "_scrollDown"
      scroll: "_hideScrollIcon"

    initialize: ->
      self = this
      @_renderSlideWrapper()
      @_renderScrollIcon()
      @afterInitialize()
      @$el.parent().on "align", ->
        self._alignView()


    _alignView: ->
      
      # adjust width
      @adjustWidth()
      
      # center vertical
      $slideContainer = @$el.parent()
      wrappedHeight = $slideContainer.height()
      totalHeight = @el.scrollHeight
      newHeight = undefined
      marginTop = undefined
      isScrollable = totalHeight > wrappedHeight
      showScrollIcon = (totalHeight - wrappedHeight) > 140
      if isScrollable
        newHeight = wrappedHeight
        marginTop = 0
      else
        newHeight = totalHeight
        marginTop = (wrappedHeight - totalHeight) / 2
      @$el.css
        height: newHeight
        marginTop: marginTop

      @$el.toggleClass "isScrollable", isScrollable
      @$scrollIcon.toggle showScrollIcon

    adjustWidth: ->
      
      # -100 because of padding
      @$el.width window.innerWidth - 160

    afterInitialize: ->

    _renderSlideWrapper: ->
      
      # wrap this.$el
      $el = $("<div>").addClass(@className).appendTo(@$el)
      @$el = $el
      @el = $el.get(0)

    _renderScrollIcon: ->
      $scrollIcon = $("<div class=\"showAll\">&#xe09b</div>")
      @$el.append $scrollIcon
      @$scrollIcon = $scrollIcon

    _scrollDown: ->
      wrappedHeight = @$el.parent().height()
      @$el.animate scrollTop: wrappedHeight

    _hideScrollIcon: ->
      if @isScrollIconVisible
        @$scrollIcon.fadeOut 200
        @isScrollIconVisible = false

