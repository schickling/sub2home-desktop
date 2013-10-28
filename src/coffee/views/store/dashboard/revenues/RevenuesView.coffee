define [
  "jquery"
  "jqueryOverscroll"
  "underscore"
  "backbone"
  "views/store/dashboard/revenues/RevenuesYearView"
], ($, jqueryOverscroll, _, Backbone, RevenuesYearView) ->

  RevenuesView = Backbone.View.extend

    wasRendered: false
    $turnoverContainer: null
    $orderControls: null

    events:
      "click #toggleRevenues": "_toggle"

    initialize: ->
      @_cacheDom()

    _render: ->
      @_renderRevenuesYears()

      # initialize overscroll
      @$turnoverContainer.overscroll
        showThumbs: false
        direction: "horizontal"
        wheelDirection: "horizontal"


    _cacheDom: ->
      @$turnoverContainer = @$("#turnoverContainer")
      @$orderControls = @$("#orderControls")

    _renderRevenuesYears: ->
      yearsCollection = @collection.getSplittedCollectionsByYears()

      # this syntax needed since yearsCollection is an object not an array
      for year of yearsCollection
        @_renderRevenuesYear yearsCollection[year]
      @wasRendered = true

    _renderRevenuesYear: (invoicesCollection) ->
      revenuesYearView = new RevenuesYearView(collection: invoicesCollection)

      # prepend because of inverted order
      @$turnoverContainer.prepend revenuesYearView.el

    _toggle: ->
      animationTime = 300
      $el = @$el
      $toggleRevenues = @$("#toggleRevenues")
      $revenues = @$("#revenues")
      $content = $(".content") # TODO dirty
      $orderControls = @$orderControls
      $iTurnover = $toggleRevenues.find("#turnover")

      # lazy render
      @_render()  unless @wasRendered
      if $toggleRevenues.hasClass("toggled") # hide
        $toggleRevenues.removeClass "toggled"
        $iTurnover.animate
          paddingLeft: 0
        , animationTime
        $revenues.animate
          opacity: 0
        , animationTime / 2, ->
          $el.animate
            height: 150
          , animationTime
          $content.animate
            top: 150
          , animationTime
          $orderControls.fadeIn animationTime

      else # show
        $el.animate
          height: 400
        , animationTime, ->
          $revenues.animate
            opacity: 1
          , animationTime / 2

        $orderControls.fadeOut animationTime
        $iTurnover.animate
          paddingLeft: 40
        , animationTime, ->
          $toggleRevenues.addClass "toggled"

        $content.animate
          top: 400
        , animationTime

