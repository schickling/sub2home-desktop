// Filename: src/js/views/store/config/AddressView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'text!templates/store/home/DeliveryTemplate.html'
    ], function ($, _, Backbone, stateModel, DeliveryTemplate) {

	var AddressView = Backbone.View.extend({

		template: _.template(DeliveryTemplate),

		events: {
			'click #currentDeliveryArea': '_showAllDeliveryAreas',
			'click #deliveryAreas span': '_selectDeliveryArea'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var storeModel = stateModel.get('storeModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();

			var json = {
				area: selectedDeliveryAreaModel.get('description'),
				postal: selectedDeliveryAreaModel.get('postal'),
				minimumDuration: selectedDeliveryAreaModel.get('minimumDuration')
			};

			this.$el.html(this.template(json));

			this._renderDeliveryAreas();
		},

		_renderDeliveryAreas: function () {
			var storeModel = stateModel.get('storeModel'),
				deliveryAreasCollection = storeModel.get('deliveryAreasCollection'),
				$deliveryAreas = this.$('#deliveryAreas'),
				$deliveryArea;

			_.each(deliveryAreasCollection.models, function (deliveryAreaModel) {
				$deliveryArea = $('<span>').text(deliveryAreaModel.get('description'));

				if (deliveryAreaModel.get('isSelected')) {
					$deliveryArea.addClass('selected');
				}

				$deliveryAreas.append($deliveryArea);
			});
		},

		_selectDeliveryArea: function (e) {
			var storeModel = stateModel.get('storeModel'),
				deliveryAreasCollection = storeModel.get('deliveryAreasCollection'),
				currentDeliveryArea = storeModel.getSelectedDeliveryAreaModel(),
				$currentDeliveryAreaInList = this.$('#deliveryAreas .selected'),
				$currentDeliveryAreaInHeader = this.$('#currentDeliveryArea span'),
				$currentDeliveryDurationInHeader = this.$('#minimumDuration'),
				$newDeliveryArea = $(e.target),
				newDeliveryArea = $newDeliveryArea.text();

			if (newDeliveryArea !== currentDeliveryArea.get('description')) {

				// unmark old deliveryArea
				currentDeliveryArea.set({
					isSelected: false
				}, {
					silent: true
				});

				// mark new delivery area as selected
				_.each(deliveryAreasCollection.models, function (deliveryAreaModel) {
					if (deliveryAreaModel.get('description') === newDeliveryArea) {

						deliveryAreaModel.set('isSelected', true);

						// write back header
						$currentDeliveryAreaInHeader.text(newDeliveryArea);
						$currentDeliveryDurationInHeader.text(deliveryAreaModel.get('minimumDuration'));

						return;
					}
				});

				// toggle selected class
				$currentDeliveryAreaInList.removeClass('selected');
				$newDeliveryArea.addClass('selected');

			}

			// slide up
			this._hideAllDeliveryAreas();
		},

		_showAllDeliveryAreas: function () {
			var $deliveryAreas = this.$('#deliveryAreas'),
				$el = this.$el;

			$el.animate({
				top: 35
			}, 200);

			$deliveryAreas.delay(120).fadeIn(150);

		},

		_hideAllDeliveryAreas: function () {
			var $deliveryAreas = this.$('#deliveryAreas'),
				$el = this.$el;

			$deliveryAreas.fadeOut(200);

			$el.delay(120).animate({
				top: 96
			}, 200);

		}

	});

	return AddressView;

});