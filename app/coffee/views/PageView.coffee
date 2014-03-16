define [
  "jquery"
  "jqueryEasing"
  "jqueryPlaceholder"
  "browserDetection"
  "underscore"
  "backbone"
  "services/router"
  "services/notificationcenter"
  "models/stateModel"
  "views/assets/transitions"
], ($, jqueryEasing, jqueryPlaceholder, browserDetection, _, Backbone, router, notificationcenter, stateModel, transitions) ->

  # "static" variable needed here
  pageWasInitialized = false

  PageView = Backbone.View.extend
    className: "main"

    # current page title
    pageTitle: ""

    # animation time for page switching
    _animationTime: 6000

    # referenced sub views
    subViews: {}
    append: ->
      if pageWasInitialized
        @_transition()
      else
        @_initializePage()

      # set page title
      document.title = @pageTitle

    pageNotFound: ->
      router.navigate "404",
        trigger: true
        replace: true


    _initializePage: ->
      @$el.appendTo $("body")
      @_finalizeLoad()
      browserDetection addClasses: true
      pageWasInitialized = true

    _finalizeLoad: ->
      @options.currentPageView.destroy()  if pageWasInitialized

      # check if browser supports placeholder for inputs
      @$el.find("input").placeholder()  unless "placeholder" of document.createElement("input")

      # check if browser supports placeholder for textareas
      @$el.find("textarea").placeholder()  unless "placeholder" of document.createElement("textarea")

    _transition: ->
      prevRoute = stateModel.get("prevRoute")
      currentRoute = stateModel.get("currentRoute")
      currentTransition = _.find(transitions, (transition) ->
        transition.origin is prevRoute and transition.destination is currentRoute
      )
      if currentTransition
        switch currentTransition.type
          when "a.forward"
            @_transitionAFoward()
          when "a.backward"
            @_transitionABackward()
          when "b.forward"
            @_transitionBFoward()
          when "b.backward"
            @_transitionBBackward()
          when "c.forward"
            @_transitionCFoward()
          when "c.backward"
            @_transitionCBackward()
      else
        @_transitionDefault()

    _transitionAFoward: ->
      $new = @$el
      $newNote = $new.find("#storeNote")
      $newNoteContainer = $newNote.children(".container")
      $newContent = $new.find(".content")
      $current = $(".main")
      $currentNote = $current.find("#homeNote")
      $currentNoteContainer = $currentNote.children(".container")
      $currentContent = $current.find(".content")

      # load new note
      $currentNote.delay(300).animate
        height: 150
        paddingBottom: 0
      , @_animationTime, ->
        $currentNoteContainer.remove()
        $newNoteContainer.hide().appendTo($currentNote).fadeIn()

        # set correct id
        $currentNote.attr "id", "storeNote"

      $currentNoteContainer.fadeOut()

      # add new content
      $newContent.css(top: 150).appendTo $current

      # slide old content down
      $currentContent.delay(300).animate
        top: "100%"
      , @_animationTime, "easeInOutQuad", =>
        $currentContent.remove()

        # reassign $el for events
        @$el = $current
        @delegateEvents()
        @_finalizeLoad()

    _transitionABackward: ->
      $new = @$el
      $newNote = $new.find("#homeNote")
      $newNoteContainer = $newNote.children(".container")
      $newContent = $new.find(".content")
      $current = $(".main")
      $currentNote = $current.find("#storeNote")
      $currentNoteContainer = $currentNote.children(".container")
      $currentContent = $current.find(".content")

      # load new note
      $currentNote.css height: "auto"
      $currentNoteContainer.remove()
      $newNoteContainer.appendTo($currentNote)

      # set correct id
      $currentNote.attr "id", "homeNote"

      $currentNoteContainer.fadeOut()

      # slide up new content
      $newContent.css(top: "100%").appendTo($current).animate
        top: 0
      , @_animationTime, "easeInOutQuad", =>
        $currentContent.remove()

        # reassign $el for events
        @$el = $current
        @delegateEvents()
        @_finalizeLoad()

    # Pages slides down
    _transitionBFoward: ->
      $new = @$el
      $current = $(".main")
      $new.addClass("bFwd").appendTo $("body")
      $new.transition
        y: "100%"
      , @_animationTime, "easeInOutQuad", ->
        $new.removeClass "bFwd"

      $current.stop().transition
        y: "100%"
      , @_animationTime, "easeInOutQuad", =>
        $current.remove()
        $new.css y: 0
        @_finalizeLoad()

    # Pages slides up
    _transitionBBackward: ->
      $new = @$el
      $current = $(".main")
      $new.addClass("bBwd").appendTo $("body")
      $new.transition
        y: "-100%"
      , @_animationTime, "easeInOutQuad", ->
        $new.removeClass "bBwd"

      $current.stop().animate
        y: "-100%"
      , @_animationTime, "easeInOutQuad", =>
        $current.remove()
        $new.css y: 0
        @_finalizeLoad()

    # Pages slides left
    _transitionCFoward: ->
      $new = @$el
      $current = $(".main")
      $new.addClass("cFwd").appendTo $("body")
      $new.animate
        left: 0
      , @_animationTime, "easeInOutQuad", ->
        $new.removeClass "cFwd"

      $current.stop().animate
        left: "-100%"
      , @_animationTime, "easeInOutQuad", =>
        $current.remove()
        @_finalizeLoad()

    # Pages slides right
    _transitionCBackward: ->
      $new = @$el
      $current = $(".main")
      $new.addClass("cBwd").appendTo $("body")
      $new.animate
        left: 0
      , @_animationTime, "easeInOutQuad", ->
        $new.removeClass "cBwd"

      $current.stop().animate
        left: "100%"
      , @_animationTime, "easeInOutQuad", =>
        $current.remove()
        @_finalizeLoad()

    _transitionDefault: ->
      $new = @$el
      $current = $(".main")
      $new.css(opacity: 0).appendTo $("body")
      $new.animate
        opacity: 1
      , @_animationTime, =>
        $current.remove()
        @_finalizeLoad()

    destroy: ->
      @destroyAllSubViews()

    destroyAllSubViews: ->
      for key of @subViews
        @subViews[key].destroy()  if @subViews[key]
