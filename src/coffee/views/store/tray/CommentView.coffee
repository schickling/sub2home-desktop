define [
  "jquery"
  "underscore"
  "backbone"
  "models/cartModel"
  "text!templates/store/tray/CommentTemplate.html"
], ($, _, Backbone, cartModel, CommentTemplate) ->

  CommentView = Backbone.View.extend

    template: _.template(CommentTemplate)
    events:
      "focusout textarea": "_saveComment"

    initialize: ->
      @_render()

    _render: ->
      json = comment: cartModel.getComment()
      @$el.html @template(json)

    _saveComment: (e) ->
      $textarea = $(e.target)
      comment = $textarea.val()
      cartModel.setComment comment


