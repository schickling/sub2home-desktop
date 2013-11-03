define [
  "jquery"
  "underscore"
  "backbone"
], ($, _, Backbone) ->

  SectionBaseView = Backbone.View.extend

    # dom
    $content: null
    $assortmentControls: null
    $loader: null
    className: ""

    # controll view class
    controlViewClass: null
    collectionClass: null
    controlView: null

    initialize: ->
      @_cacheDom()
      @_initializeCollection()
      @_renderControl()
      @_fetchCollection()

    _cacheDom: ->
      @$content = @$(".slide." + @className)
      @$assortmentControls = @$(".assortmentControls." + @className)
      @$loader = @$("#loader")

    _initializeCollection: ->
      @collection = new @collectionClass()

    _fetchCollection: ->

    _renderContent: ->

    _renderControl: ->
      @controlView = new @controlViewClass(
        el: @$assortmentControls
        $loader: @$loader
        collection: @collection
      )

    destroy: ->
      @controlView.destroy()


