// Filename: src/js/views/store/assortment/ingredients/Ingredient.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/assortment/ingredients/IngredientTemplate.html'
    ], function ($, _, Backbone, notificationcenter, IngredientTemplate) {

	var Ingredient = Backbone.View.extend({

		className: 'ingredient',

		events: {
			'click .bEye': '_toggleIsActive',
			'focusout input': '_updateCustomPrice',
			'click .bReset': '_resetCustomPrice'
		},

		template: _.template(IngredientTemplate),

		initialize: function () {
			this._render();

			this.model.on('renderAgain', this._render, this);
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('customPrice'),
				info: this.model.get('info'),
				buyed: this.model.get('buyed'),
				image: this.model.get('largeImage'),
				priceDiffers: this.model.get('customPrice') !== this.model.get('price')
			};

			this.$el.html(this.template(json));

		},

		_toggleIsActive: function () {
			var ingredientModel = this.model,
				$eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');

			ingredientModel.set('isActive', isActive);
			ingredientModel.save({}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.ingredients.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.ingredients.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.ingredients.error');
					ingredientModel.set('isActive', !isActive);
				}
			});
		},

		_updateCustomPrice: function () {
			var $input = this.$('.pricetag input'),
				customPrice = parseFloat($input.val()),
				self = this;

			this.model.set('customPrice', customPrice);
			this.model.save({}, {
				success: function () {
					notificationcenter.notify('Preis geaendert');

					// rerender for reset button
					self._render();
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.ingredients.error');
				}
			});
		},

		_resetCustomPrice: function () {
			var $input = this.$('.pricetag input');

			$input.val(this.model.get('price'));
			this._updateCustomPrice();
		}

	});

	return Ingredient;

});