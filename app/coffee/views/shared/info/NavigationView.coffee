define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  NavigationView = Backbone.View.extend

    events:
      "click .infoNavigation li": "_jumpToNavigationItem"

    $content: null
    $navigation: null
    $articles: null
    currentIndex: 0
    scrollListnening: true # to prevent calculation while triggered scrolling

    initialize: ->
      @_cacheDom()
      @_render()
      @_listenToScroll()

    _cacheDom: ->
      @$content = @$(".content")
      @$articles = @$content.find("article")
      @$navigation = @$(".infoNavigation")

    _render: ->
      $navigationList = @$navigation.find("ul")
      $articleHeader = undefined
      $newListItem = undefined
      @$articles.each ->
        $articleHeader = $(this).find("header h1")
        $newListItem = $("<li>" + $articleHeader.attr("data-nav") + "</li>")
        $navigationList.append $newListItem

      $navigationList.find("li").first().addClass "active"

    _listenToScroll: ->
      self = this
      $content = @$content
      $articles = @$articles
      antepenultimate = $articles.length - 3
      currentIndex = undefined
      timer = undefined

      # Bind to scroll
      $content.on "scroll", ->
        if self.scrollListnening

          # wrap in timeout to buffer events
          clearTimeout timer
          timer = setTimeout(->
            currentIndex = -1
            $articles.each ->
              currentIndex++  if $(this).offset().top <= 150


            # check if bottom reached
            currentIndex++  if currentIndex > antepenultimate and currentIndex < ($articles.length - 1) and $content.scrollTop() is $content[0].scrollHeight - $content.height()
            if currentIndex isnt self.currentIndex
              self.currentIndex = currentIndex
              self._changeActiveNavigationItem()
          , 20)


    _changeActiveNavigationItem: ->
      $oldActive = @$navigation.find(".active")
      $newActive = @$navigation.find("li").eq(@currentIndex)
      $oldActive.removeClass "active"
      $newActive.addClass "active"

    _jumpToNavigationItem: (e) ->
      $currentNavigationItem = $(e.target)
      currentIndex = $currentNavigationItem.index()
      $currentArticle = @$articles.eq(currentIndex)
      scrollTop = $currentArticle.offset().top + @$content.scrollTop() - 100
      self = this

      # bypass scroll event
      @scrollListnening = false
      @currentIndex = currentIndex
      @_changeActiveNavigationItem()
      @$content.animate
        scrollTop: scrollTop
      , ->
        self.scrollListnening = true


