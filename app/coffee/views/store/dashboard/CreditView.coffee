define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "models/CreditModel"
  "text!templates/store/dashboard/CreditTemplate.html"
], ($, _, Backbone, notificationcenter, CreditModel, CreditTemplate) ->

  CreditView = Backbone.View.extend

    template: _.template(CreditTemplate)
    events:
      "click #cancelBalanceOrder": "_close"
      "click #submitBalanceOrder": "_create"

    orderModel: null

    createForOrder: (orderModel) ->
      @orderModel = orderModel
      @model = new CreditModel(total: orderModel.get("total"))
      @_render()
      @_show()

    _render: ->
      json =
        orderNumber: @orderModel.getNumber()
        total: @model.get("total")

      @$el.html @template(json)

    _show: ->
      @$el.fadeIn()
      @$("#balanceOrderMessage").focus()

    _close: ->
      @$el.fadeOut()

    _create: ->
      self = this
      total = @$("#balanceOrderValueInput").val()
      description = @$("#balanceOrderMessage").val()
      unless description
        notificationcenter.notify "views.store.dashboard.credit.noDescription"
        return
      if total > @orderModel.get("total")
        notificationcenter.notify "views.store.dashboard.credit.tooMuchTotal"
        return
      if total <= 0
        notificationcenter.notify "views.store.dashboard.credit.tooLessTotal"
        return
      @model.save
        total: total
        description: description
      ,
        url: "orders/" + self.orderModel.get("id") + "/credits"
        success: ->
          notificationcenter.notify "views.store.dashboard.credit.success"
          self.orderModel.set "creditModel", self.model
          self._close()

        error: ->
          notificationcenter.notify "views.store.dashboard.credit.error"


