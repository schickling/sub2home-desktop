// Filename: src/js/views/store/assortment/ControlBaseView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	var ControlBaseView = Backbone.View.extend({

		template: null,

		numberOfCurrentRequests: 0,
		numberOfItems: 0,

		$loader: null,
		$loadbar: null,

		initialize: function () {
			this._render();
			this._cacheDom();

			// since collection is loaded async the number has to be calculated on complete
			this.listenTo(this.collection, 'sync', this._countItems);

			this._listenForDestory();
		},

		_render: function () {
			this.$el.html(this.template);
		},

		_countItems: function () {},

		_cacheDom: function () {
			this.$loader = this.options.$loader;
			this.$loadbar = this.$loader.find('#loadbar');
		},

		_updateModel: function (model, changedAttributes) {

			var self = this;

			this.numberOfCurrentRequests++;

			model.save(changedAttributes, {
				success: function () {
					self.numberOfCurrentRequests--;
					self._updateLoadBar();

					model.trigger('renderAgain');
				}
			});
		},

		_updateLoadBar: function () {
			var progress = 1 - this.numberOfCurrentRequests / this.numberOfItems,
				relativeWidth = progress * 100 + '%';

			if (progress < 1) {
				this.$loader.fadeIn();
			} else {
				this.$loader.fadeOut();
			}

			this.$loadbar.width(relativeWidth);
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.stopListening();
			}, this);
		}

	});

	return ControlBaseView;

});