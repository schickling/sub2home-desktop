define(["jquery", "underscore", "backbone", "views/shared/misc/PostalSearchView", "text!templates/store/home/DeliveryPopupTemplate.html"], function($, _, Backbone, PostalSearchView, DeliveryPopupTemplate) {
  var DeliveryPopupView;
  return DeliveryPopupView = Backbone.View.extend({
    template: _.template(DeliveryPopupTemplate),
    events: {
      "click #postalSelection span": "_selectPostal",
      "input #locationSelectionInput": "_preselectPostals",
      "click #deliveryAreaSelection.onlyOneDeliveryArea": "_transferClick",
      "click #deliveryAreaSelection span": "_selectDeliveryArea",
      "click": "_hide"
    },
    postals: [],
    preselectionTimeout: null,
    postalSearchView: null,
    $postalSelection: null,
    $deliveryAreaSelection: null,
    initialize: function() {
      this._collectPostals();
      this._render();
      this._fadeIn();
      this._preselectPostals();
      return this._runAndWaitForPostal();
    },
    _collectPostals: function() {
      var deliveryAreasCollection, postals;
      deliveryAreasCollection = this.model.get("deliveryAreasCollection");
      postals = [];
      _.each(deliveryAreasCollection.models, function(deliveryAreaModel) {
        return postals.push(deliveryAreaModel.get("postal"));
      });
      return this.postals = _.uniq(postals);
    },
    _render: function() {
      this.$el.html(this.template());
      this._cacheDom();
      this._renderPostals();
      return this._renderPostalSearchView();
    },
    _cacheDom: function() {
      this.$postalSelection = this.$("#postalSelection");
      return this.$deliveryAreaSelection = this.$("#deliveryAreaSelection");
    },
    _renderPostals: function() {
      var html;
      html = "";
      _.each(this.postals, function(postal) {
        return html += "<span>" + postal + "</span>";
      });
      return this.$postalSelection.html(html);
    },
    _renderPostalSearchView: function() {
      return this.postalSearchView = new PostalSearchView({
        el: this.$("#locationSelection")
      });
    },
    _runAndWaitForPostal: function() {
      this.listenTo(this.postalSearchView, "newPostal", this._newPostal);
      return this.postalSearchView.run();
    },
    _selectPostal: function(e) {
      var postal;
      postal = e.target.textContent;
      return this.postalSearchView.setPostal(postal);
    },
    _newPostal: function(postal) {
      var deliveryAreasCollection, matchingDeliveryAreaModels;
      this._preselectPostals();
      deliveryAreasCollection = this.model.get("deliveryAreasCollection");
      matchingDeliveryAreaModels = deliveryAreasCollection.where({
        postal: postal
      });
      if (matchingDeliveryAreaModels.length === 1) {
        this._renderOneDeliveryArea(matchingDeliveryAreaModels[0]);
        return this.postalSearchView.showDeliveryAreaLabel();
      } else if (matchingDeliveryAreaModels.length > 1) {
        this._renderMultipleeDeliveryAreas(matchingDeliveryAreaModels);
        return this.postalSearchView.showDeliveryAreaLabel();
      } else {
        this._renderNoDeliveryArea(postal);
        return this.postalSearchView.showLocationLabel();
      }
    },
    _renderOneDeliveryArea: function(deliveryAreaModel) {
      var html;
      html = "Nach <span data-postal=\"" + deliveryAreaModel.get("postal") + "\">" + deliveryAreaModel.get("city") + "</span> (" + deliveryAreaModel.get("postal") + ") liefern lassen";
      return this.$deliveryAreaSelection.html(html).removeClass().addClass("onlyOneDeliveryArea");
    },
    _renderMultipleeDeliveryAreas: function(deliveryAreaModels) {
      var district, html;
      html = "";
      district = void 0;
      _.each(deliveryAreaModels, function(deliveryAreaModel) {
        district = deliveryAreaModel.get("district") || deliveryAreaModel.get("city");
        return html += "<span  data-postal=\"" + deliveryAreaModel.get("postal") + "\">" + district + "</span>";
      });
      return this.$deliveryAreaSelection.html(html).removeClass();
    },
    _renderNoDeliveryArea: function(postal) {
      return this.$deliveryAreaSelection.html("SUBWAY<span class=\"superscript\">®</span> " + this.model.get("title") + " liefert leider nicht nach " + postal).removeClass().addClass("noDeliveryArea");
    },
    _preselectPostals: function() {
      var self;
      self = this;
      clearTimeout(this.preselectionTimeout);
      return this.preselectionTimeout = setTimeout(function() {
        var $renderedPostals, postalPrefix;
        postalPrefix = self.$("#locationSelectionInput").val();
        $renderedPostals = self.$postalSelection.children();
        return $renderedPostals.each(function() {
          return $(this).toggleClass("preselected", this.textContent.indexOf(postalPrefix) !== -1);
        });
      }, 50);
    },
    _selectDeliveryArea: function(e) {
      var deliveryAreasCollection, district, newDeliveryAreaModel, oldSelectedDeliveryAreaModel, postal;
      postal = parseInt(e.target.getAttribute("data-postal"), 10);
      district = e.target.textContent;
      oldSelectedDeliveryAreaModel = this.model.getSelectedDeliveryAreaModel();
      deliveryAreasCollection = this.model.get("deliveryAreasCollection");
      newDeliveryAreaModel = deliveryAreasCollection.find(function(deliveryAreaModel) {
        return deliveryAreaModel.get("postal") === postal && (deliveryAreaModel.get("district") === district || deliveryAreaModel.get("city") === district);
      });
      oldSelectedDeliveryAreaModel.set({
        isSelected: false
      }, {
        silent: true
      });
      newDeliveryAreaModel.set("isSelected", true);
      return this._fadeOut();
    },
    _transferClick: function(e) {
      return $(e.target).children("span").trigger("click");
    },
    _hide: function(e) {
      if (e.target === this.el) {
        return this._fadeOut();
      }
    },
    _fadeIn: function() {
      return this.$el.fadeIn();
    },
    _fadeOut: function() {
      return this.$el.fadeOut();
    }
  });
});
