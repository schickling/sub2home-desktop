// Filename: src/js/views/header/HeaderView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'views/header/StoreView',
	'views/header/ClientView',
	'text!templates/header/HeaderTemplate.html'
	], function ($, _, Backbone, stateModel, StoreView, ClientView, HeaderTemplate) {

	var HeaderView = Backbone.View.extend({

		el: $('#header'),

		events: {
			'click .logo': 'reset',
			'click .switch': 'switchChildView'
		},

		childView: null,

		initialize: function () {
			this.render();

			stateModel.on('change:storeModel', this.renderStoreView, this);

			stateModel.on('change:isClientHeaderActive', function () {
				if (stateModel.get('isClientHeaderActive')) {
					this.renderClientView();
				} else {
					this.renderStoreView();
				}
			}, this);
		},

		render: function () {

			this.$el.html(HeaderTemplate);

			if (stateModel.get('isClientHeaderActive')) {
				this.renderClientView();
			} else if (stateModel.get('storeModel')) {
				this.renderStoreView();
			}

		},

		renderStoreView: function () {
			this.childView = new StoreView({
				model: stateModel.get('storeModel'),
				el: this.$('#headerContent')
			});
		},

		renderClientView: function () {
			this.childView = new ClientView({
				el: this.$('#headerContent')
			});
		},

		reset: function () {
			window.localStorage.clear();
		},

		switchChildView: function () {
			stateModel.set('isClientHeaderActive', !stateModel.get('isClientHeaderActive'));
		}

	});

	return HeaderView;

});