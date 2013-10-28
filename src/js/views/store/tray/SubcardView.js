define(["jquery", "underscore", "backbone", "services/notificationcenter", "models/cartModel", "text!templates/store/tray/SubcardTemplate.html"], function($, _, Backbone, notificationcenter, cartModel, SubcardTemplate) {
  var SubcardView;
  return SubcardView = Backbone.View.extend({
    template: _.template(SubcardTemplate),
    events: {
      "click #selectImage": "_showFinder",
      "change #uploadImage": "_prepareImage"
    },
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var json;
      json = {};
      return this.$el.html(this.template(json));
    },
    _showFinder: function() {
      return this.$("#uploadImage").trigger("click");
    },
    _prepareImage: function(e) {
      var file, reader, self;
      if (e.target.files.length > 0) {
        file = e.target.files[0];
        self = this;
        reader = new FileReader();
        if (!file.type.match("image.*")) {
          notificationcenter.notify("views.store.tray.subcard.invalidFileType");
          return;
        }
        reader.onloadend = function(evt) {
          return self._fetchSubcardCode(evt.target.result);
        };
        return reader.readAsDataURL(file);
      }
    },
    _fetchSubcardCode: function(baseUrl) {
      var orderModel;
      orderModel = cartModel.get("orderModel");
      return $.ajax({
        url: "services/decode",
        data: JSON.stringify({
          image: baseUrl
        }),
        type: "post",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(response) {
          orderModel.set("subcardCode", response.info);
          return notificationcenter.notify("views.store.tray.subcard.success");
        },
        error: function() {
          return notificationcenter.notify("views.store.tray.subcard.invalidImage");
        }
      });
    }
  });
});

/*
//@ sourceMappingURL=SubcardView.js.map
*/