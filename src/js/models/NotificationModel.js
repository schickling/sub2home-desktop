define(["underscore", "backbone"], function(_, Backbone) {
  var NotificationModel;
  return NotificationModel = Backbone.Model.extend({
    defaults: {
      className: "info",
      title: "Notificationtitle",
      description: "Notificationdescription",
      duration: 5000
    }
  });
});

/*
//@ sourceMappingURL=NotificationModel.js.map
*/