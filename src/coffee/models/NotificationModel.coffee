define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  NotificationModel = Backbone.Model.extend

    defaults:
      className: "info"
      title: "Notificationtitle"
      description: "Notificationdescription"
      duration: 5000

