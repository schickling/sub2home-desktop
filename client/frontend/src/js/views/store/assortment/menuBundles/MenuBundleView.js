// Filename: src/js/views/store/assortment/menuBundles/MenuBundleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/assortment/menuBundles/MenuBundleTemplate.html'
    ], function ($, _, Backbone, notificationcenter, MenuBundleTemplate) {

	var MenuBundleView = Backbone.View.extend({

		className: 'menuBundle',

		events: {
			'click .bEye': '_toggleIsActive',
			'focusout input': '_updateCustomPrice',
			'click .bReset': '_resetCustomPrice'
		},

		template: _.template(MenuBundleTemplate),

		initialize: function () {
			this._render();

			this.model.on('renderAgain', this._render, this);
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('customPrice'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyed'),
				image: this.model.get('smallImage')
			};

			this.$el.html(this.template(json));

			this.$el.toggleClass('inactive', !this.model.get('isActive'));

		},

		_toggleIsActive: function () {
			var menuBundleModel = this.model,
				$eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');

			menuBundleModel.save({
				isActive: isActive
			}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.menuBundles.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.menuBundles.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.menuBundles.error');
					menuBundleModel.set('isActive', !isActive);
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
					notificationcenter.notify('views.store.assortment.menuBundles.error');
				}
			});
		},

		_resetCustomPrice: function () {
			var $input = this.$('.pricetag input');

			$input.val(this.model.get('price'));
			this._updateCustomPrice();
		}

	});

	return MenuBundleView;

});