// Filename: src/js/views/store/home/DeliveryPopupView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/shared/misc/PostalSearchView',
    'text!templates/store/home/DeliveryPopupTemplate.html'
], function ($, _, Backbone, PostalSearchView, DeliveryPopupTemplate) {

	"use strict";

	var DeliveryPopupView = Backbone.View.extend({

		template: _.template(DeliveryPopupTemplate),

		events: {
			'click #postalSelection span': '_selectPostal',
			'input #locationSelectionInput': '_preselectPostals',
			'click #deliveryAreaSelection.onlyOneDeliveryArea': '_transferClick',
			'click #deliveryAreaSelection span': '_selectDeliveryArea',
			'click': '_hide'
		},

		postals: [],

		preselectionTimeout: null,

		postalSearchView: null,

		$postalSelection: null,
		$deliveryAreaSelection: null,

		initialize: function () {
			this._collectPostals();
			this._render();
			this._fadeIn();
			this._preselectPostals();
			this._runAndWaitForPostal();
		},

		_collectPostals: function () {
			var deliveryAreasCollection = this.model.get('deliveryAreasCollection'),
				postals = [];

			_.each(deliveryAreasCollection.models, function (deliveryAreaModel) {
				postals.push(deliveryAreaModel.get('postal'));
			});

			this.postals = _.uniq(postals);
		},

		_render: function () {
			this.$el.html(this.template());
			this._cacheDom();
			this._renderPostals();
			this._renderPostalSearchView();
		},

		_cacheDom: function () {
			this.$postalSelection = this.$('#postalSelection');
			this.$deliveryAreaSelection = this.$('#deliveryAreaSelection');
		},

		_renderPostals: function () {
			var html = '';

			_.each(this.postals, function (postal) {
				html += '<span>' + postal + '</span>';
			});

			this.$postalSelection.html(html);
		},

		_renderPostalSearchView: function () {
			this.postalSearchView = new PostalSearchView({
				el: this.$('#locationSelection')
			});
		},

		_runAndWaitForPostal: function () {
			this.listenTo(this.postalSearchView, 'newPostal', this._newPostal);
			this.postalSearchView.run();
		},

		_selectPostal: function (e) {
			var postal = e.target.textContent;
			this.postalSearchView.setPostal(postal);
		},

		_newPostal: function (postal) {
			this._preselectPostals();

			var deliveryAreasCollection = this.model.get('deliveryAreasCollection'),
				matchingDeliveryAreaModels = deliveryAreasCollection.where({
					postal: postal
				});

			if (matchingDeliveryAreaModels.length == 1) {
				this._renderOneDeliveryArea(matchingDeliveryAreaModels[0]);
				this.postalSearchView.showDeliveryAreaLabel();
			} else if (matchingDeliveryAreaModels.length > 1) {
				this._renderMultipleeDeliveryAreas(matchingDeliveryAreaModels);
				this.postalSearchView.showDeliveryAreaLabel();
			} else {
				this._renderNoDeliveryArea(postal);
			}
		},

		_renderOneDeliveryArea: function (deliveryAreaModel) {
			var html = 'Nach <span data-district="false" data-postal="' + deliveryAreaModel.get('postal') + '">' + deliveryAreaModel.get('city') + '</span> (' + deliveryAreaModel.get('postal') + ') liefern lassen';
			this.$deliveryAreaSelection.html(html).removeClass().addClass('onlyOneDeliveryArea');
		},

		_renderMultipleeDeliveryAreas: function (deliveryAreaModels) {
			var html = '',
				isDistirct, district;

			_.each(deliveryAreaModels, function (deliveryAreaModel) {
				isDistirct = deliveryAreaModel.has('district');
				district = deliveryAreaModel.get('district') || deliveryAreaModel.get('city');
				html += '<span data-district="' + isDistirct + '" data-postal="' + deliveryAreaModel.get('postal') + '">' + district + '</span>';
			});

			this.$deliveryAreaSelection.html(html).removeClass();
		},

		_renderNoDeliveryArea: function (postal) {
			this.$deliveryAreaSelection.html('SUBWAY® ' + this.model.get('title') + ' liefert leider nicht nach ' + postal).removeClass().addClass('noDeliveryArea');
		},

		_preselectPostals: function () {
			var self = this;

			clearTimeout(this.preselectionTimeout);
			this.preselectionTimeout = setTimeout(function () {

				var postalPrefix = self.$('#locationSelectionInput').val(),
					$renderedPostals = self.$postalSelection.children();

				$renderedPostals.each(function () {
					$(this).toggleClass('preselected', this.textContent.indexOf(postalPrefix) != -1);
				});

			}, 50);
		},

		_selectDeliveryArea: function (e) {
			var postal = parseInt(e.target.dataset.postal, 10),
				isDistirct = e.target.dataset.district === 'true',
				district = e.target.textContent,
				oldSelectedDeliveryAreaModel = this.model.getSelectedDeliveryAreaModel(),
				deliveryAreasCollection = this.model.get('deliveryAreasCollection'),
				newDeliveryAreaModel = deliveryAreasCollection.find(function (deliveryAreaModel) {
					if (isDistirct) {
						return deliveryAreaModel.get('postal') == postal && deliveryAreaModel.get('district') == district;
					} else {
						return deliveryAreaModel.get('postal') == postal && deliveryAreaModel.get('city') == district;
					}
				});

			oldSelectedDeliveryAreaModel.set({
				isSelected: false
			}, {
				silent: true
			});
			newDeliveryAreaModel.set('isSelected', true);

			this._fadeOut();
		},

		_transferClick: function (e) {
			$(e.target).children('span').trigger('click');
		},

		_hide: function (e) {
			if (e.target == this.el) {
				this._fadeOut();
			}
		},

		_fadeIn: function () {
			this.$el.fadeIn();
		},

		_fadeOut: function () {
			this.$el.fadeOut();
		}

	});

	return DeliveryPopupView;

});