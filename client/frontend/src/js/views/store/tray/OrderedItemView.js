// Filename: src/js/views/store/tray/OrderedItemView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'views/store/tray/OrderedArticleSingleView',
    'views/store/tray/OrderedMenuView'
    ], function ($, _, Backbone, router, notificationcenter, OrderedArticleSingleView, OrderedMenuView) {

	var OrderedItemView = Backbone.View.extend({

		className: 'orderedItem',

		events: {
			'click .deleteItem': '_destroy',
			'click .itemPreview': '_edit',
			'click .addItem': '_increaseAmount',
			'click .increaseAmount': '_increaseAmount',
			'click .decreaseAmount': '_decreaseAmount'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			if (this.model.isMenu()) {
				this._renderOrderedMenu();
			} else {
				this._renderOrderedArticleSingle();
			}
		},

		_renderOrderedMenu: function () {
			var orderedMenuView = new OrderedMenuView({
				model: this.model,
				el: this.$el
			});
		},

		_renderOrderedArticleSingle: function () {
			var orderedArticleSingleView = new OrderedArticleSingleView({
				model: this.model,
				el: this.$el
			});
		},

		_destroy: function () {
			var self = this;

			if (this.model.collection.length === 1) {
				notificationcenter.notify('views.store.tray.cartNowEmpty');
				router.navigate('store', {
					trigger: true,
					replace: true
				});
			}

			this.model.destroy();

			self.$el.fadeOut(function () {
				self.remove();
			});
		},

		_edit: function () {
			router.navigate('store/theke/aendern/' + this.model.get('id'), true);
		},

		_increaseAmount: function () {
			this.model.set('amount', this.model.get('amount') + 1);
			this._render();
		},

		_decreaseAmount: function () {
			this.model.set('amount', this.model.get('amount') - 1);
			this._render();
		}

	});

	return OrderedItemView;

});