// Filename: src/js/views/store/assortment/MenuView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/assortment/menus/MenuTemplate.html'
    ], function ($, _, Backbone, notificationcenter, MenuTemplate) {

	var MenuView = Backbone.View.extend({

		className: 'menu',

		events: {
			'click .bEye': '_toggleIsActive',
			'focusout input': '_updateCustomPrice',
			'click .bReset': '_resetCustomPrice'
		},

		template: _.template(MenuTemplate),

		initialize: function () {
			this._render();

			this.model.on('renderAgain', this._render, this);
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('customPrice'),
				info: this.model.get('info'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyedInStore'),
				image: this.model.get('smallImage')
			};

			this.$el.html(this.template(json));

			this.$el.toggleClass('inactive', !this.model.get('isActive'));

		},

		_toggleIsActive: function () {
			var menuModel = this.model,
				$eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');

			if (!isActive && this._isLastActiveMenu()) {
				notificationcenter.notify('views.store.assortment.menus.oneActiveMenuNeeded');
				return;
			}


			menuModel.set('isActive', isActive);
			menuModel.save({}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.menus.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.menus.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.menus.error');
					menuModel.set('isActive', !isActive);
				}
			});
		},

		_updateCustomPrice: function () {
			var $input = this.$('.pricetag input'),
				customPrice = parseFloat($input.val());

			this.model.set('customPrice', customPrice);
			this.model.save({}, {
				success: function () {
					notificationcenter.notify('Preis geaendert');
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.menus.error');
				}
			});
		},

		_resetCustomPrice: function () {
			var $input = this.$('.pricetag input');

			$input.val(this.model.get('price'));
			this._updateCustomPrice();
		}

	});

	return MenuView;

});