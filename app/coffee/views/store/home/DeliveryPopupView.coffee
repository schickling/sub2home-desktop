define [
  "jquery"
  "underscore"
  "backbone"
  "views/shared/misc/PostalSearchView"
  "text!templates/store/home/DeliveryPopupTemplate.html"
], ($, _, Backbone, PostalSearchView, DeliveryPopupTemplate) ->

  DeliveryPopupView = Backbone.View.extend

    events:
      "click #postalSelection span": "_selectPostal"
      "input #locationSelectionInput": "_preselectPartialPostals"
      "click #deliveryAreaSelection.onlyOneDeliveryArea": "_transferClick"
      "click #deliveryAreaSelection span": "_handleDeliveryAreaSelection"
      "click": "_hide"

    postals: []
    preselectionTimeout: null
    postalSearchView: null

    $postalSelection: null
    $deliveryAreaSelection: null

    initialize: ->
      @_collectPostals()
      @_render()
      @_fadeIn()
      @_preselectPartialPostals()
      @_runAndWaitForPostal()
      @_optimizedOnePostalBehavior()  if @postals.length is 1

    _collectPostals: ->
      deliveryAreasCollection = @model.get("deliveryAreasCollection")
      postals = []
      _.each deliveryAreasCollection.models, (deliveryAreaModel) ->
        postals.push deliveryAreaModel.get("postal")

      @postals = _.uniq(postals)

    _render: ->
      @$el.html DeliveryPopupTemplate
      @_cacheDom()
      @_renderPostals()
      @_renderPostalSearchView()

    _cacheDom: ->
      @$postalSelection = @$("#postalSelection")
      @$deliveryAreaSelection = @$("#deliveryAreaSelection")

    _renderPostals: ->
      html = ""
      _.each @postals, (postal) ->
        html += "<span>" + postal + "</span>"

      @$postalSelection.html html

    _renderPostalSearchView: ->
      @postalSearchView = new PostalSearchView(el: @$("#locationSelection"))

    _runAndWaitForPostal: ->
      @listenTo @postalSearchView, "newPostal", @_newPostal
      @postalSearchView.run()

    _optimizedOnePostalBehavior: ->
      @postalSearchView.setPostal @postals[0]
      @$postalSelection.addClass "hide"

    _selectPostal: (e) ->
      postal = e.target.textContent
      @postalSearchView.setPostal postal

    _newPostal: (postal) ->
      @_preselectPartialPostals()
      deliveryAreasCollection = @model.get("deliveryAreasCollection")
      matchingDeliveryAreaModels = deliveryAreasCollection.where(postal: postal)
      if matchingDeliveryAreaModels.length is 1
        @_selectDeliveryArea matchingDeliveryAreaModels[0]
      else if matchingDeliveryAreaModels.length > 1
        @_renderMultipleeDeliveryAreas matchingDeliveryAreaModels
        @postalSearchView.showDeliveryAreaLabel()
      else
        @_renderNoDeliveryArea postal
        @postalSearchView.showLocationLabel()

    _renderMultipleeDeliveryAreas: (deliveryAreaModels) ->
      html = ""
      district = undefined
      _.each deliveryAreaModels, (deliveryAreaModel) ->
        district = deliveryAreaModel.get("district") or deliveryAreaModel.get("city")
        html += "<span  data-postal=\"" + deliveryAreaModel.get("postal") + "\">" + district + "</span>"

      @$deliveryAreaSelection.html(html).removeClass()

    _renderNoDeliveryArea: (postal) ->
      @$deliveryAreaSelection.html("SUBWAY<span class=\"superscript\">®</span> " + @model.get("title") + " liefert leider nicht nach " + postal).removeClass().addClass "noDeliveryArea"

    _preselectPartialPostals: ->
      clearTimeout @preselectionTimeout
      @preselectionTimeout = setTimeout =>
        postalPrefix = @$("#locationSelectionInput").val()
        $renderedPostals = @$postalSelection.children()
        $renderedPostals.each ->
          $(this).toggleClass "preselected", @textContent.indexOf(postalPrefix) isnt -1
      , 50

    _selectDeliveryArea: (deliveryAreaModel) ->
      oldSelectedDeliveryAreaModel = @model.getSelectedDeliveryAreaModel()
      oldSelectedDeliveryAreaModel.set
        isSelected: false
      ,
        silent: true

      deliveryAreaModel.set "isSelected", true
      @_fadeOut()

    _handleDeliveryAreaSelection: (e) ->
      postal = parseInt(e.target.getAttribute("data-postal"), 10)
      district = e.target.textContent
      deliveryAreasCollection = @model.get("deliveryAreasCollection")
      newDeliveryAreaModel = deliveryAreasCollection.find((deliveryAreaModel) ->
        deliveryAreaModel.get("postal") is postal and (deliveryAreaModel.get("district") is district or deliveryAreaModel.get("city") is district)
      )
      @_selectDeliveryArea newDeliveryAreaModel

    _transferClick: (e) ->
      $(e.target).children("span").trigger "click"

    _hide: (e) ->
      @_fadeOut()  if e.target is @el

    _fadeIn: ->
      @$el.fadeIn()

    _fadeOut: ->
      @$el.fadeOut()
