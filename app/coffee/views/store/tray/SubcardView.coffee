define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/cartModel"
  "text!templates/store/tray/SubcardTemplate.html"
], ($, _, Backbone, notificationcenter, cartModel, SubcardTemplate) ->

  SubcardView = Backbone.View.extend

    template: _.template(SubcardTemplate)
    events:
      "click #selectImage": "_showFinder"
      "change #uploadImage": "_prepareImage"

    initialize: ->
      @_render()

    _render: ->
      json = {}
      @$el.html @template(json)

    _showFinder: ->
      @$("#uploadImage").trigger "click"

    _prepareImage: (e) ->

      # check if files available
      if e.target.files.length > 0
        file = e.target.files[0]
        self = this
        reader = new FileReader()

        # Only process image files.
        unless file.type.match("image.*")
          notificationcenter.notify "views.store.tray.subcard.invalidFileType"
          return

        # wait until image is encoded
        reader.onloadend = (evt) ->
          self._fetchSubcardCode evt.target.result


        # Read in the image file as a data URL.
        reader.readAsDataURL file

    _fetchSubcardCode: (baseUrl) ->
      orderModel = cartModel.get("orderModel")
      $.ajax
        url: "services/decode"
        data: JSON.stringify(image: baseUrl)
        type: "post"
        dataType: "json"
        contentType: "application/json; charset=utf-8"
        success: (response) =>
          orderModel.set "subcardCode", response.info
          notificationcenter.notify "views.store.tray.subcard.success"
          @$el.addClass "success"
        error: ->
          notificationcenter.notify "views.store.tray.subcard.invalidImage"

