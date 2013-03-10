// Filename: src/js/views/store/assortment/ArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/assortment/articles/ArticleTemplate.html'
    ], function ($, _, Backbone, notificationcenter, ArticleTemplate) {

	var ArticleView = Backbone.View.extend({

		className: 'article',

		events: {
			'click .bEye': '_toggleIsActive',
			'focusout input': '_updateCustomPrice',
			'click .bReset': '_resetCustomPrice'
		},

		template: _.template(ArticleTemplate),

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
			var $eye = this.$('.bEye'),
				$el = this.$el,
				isActive = !this.model.get('isActive');


			this.model.set('isActive', isActive);
			this.model.save({}, {
				success: function () {
					$eye.toggleClass('open', isActive);
					$el.toggleClass('inactive', !isActive);

					if (isActive) {
						notificationcenter.notify('views.store.assortment.articles.success.isActive');
					} else {
						notificationcenter.notify('views.store.assortment.articles.success.isNotActive');
					}
				},
				error: function () {
					notificationcenter.notify('views.store.assortment.articles.error');
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
					notificationcenter.notify('views.store.assortment.articles.error');
				}
			});
		},

		_resetCustomPrice: function () {
			var $input = this.$('.pricetag input');

			$input.val(this.model.get('price'));
			this._updateCustomPrice();
		}

	});

	return ArticleView;

});