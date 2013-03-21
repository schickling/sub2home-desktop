// Filename: src/js/views/store/assortment/menuUpgrades/MenuUpgradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/assortment/menuUpgrades/MenuUpgradeTemplate.html'
    ], function ($, _, Backbone, notificationcenter, MenuUpgradeTemplate) {

	var MenuUpgradeView = Backbone.View.extend({

		className: 'menuUpgrade',

		events: {
			'click .bEye': '_toggleIsActive',
			'focusout input': '_updateCustomPrice',
			'click .bReset': '_resetCustomPrice'
		},

		template: _.template(MenuUpgradeTemplate),

		initialize: function () {
			this._render();

			this.model.on('renderAgain', this._render, this);
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('customPrice'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyed')
			};

			this.$el.html(this.template(json));

			this.$el.toggleClass('inactive', !this.model.get('isActive'));

		},

		_toggleIsActive: function () {
			var menuUpgradeModel = this.model,
				$eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');

			menuUpgradeModel.save({
				isActive: isActive
			}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.menuUpgrades.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.menuUpgrades.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.menuUpgrades.error');
					menuUpgradeModel.set('isActive', !isActive);
				}
			});
		},

		_updateCustomPrice: function () {
			var $input = this.$('.pricetag input'),
				customPrice = parseFloat($input.val());

			this.model.save({
				customPrice: customPrice
			}, {
				success: function () {
					notificationcenter.notify('Preis geaendert');
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.menuUpgrades.error');
				}
			});
		},

		_resetCustomPrice: function () {
			var $input = this.$('.pricetag input');

			$input.val(this.model.get('price'));
			this._updateCustomPrice();
		}

	});

	return MenuUpgradeView;

});