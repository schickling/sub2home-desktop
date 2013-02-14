// Filename: src/js/views/header/HeaderView.js
define([
	'jquery',
	'jqueryEasing',
	'underscore',
	'backbone',
	'models/stateModel',
	'views/header/StoreView',
	'views/header/ClientView',
	'text!templates/header/HeaderTemplate.html'
	], function ($, jqueryEasing, _, Backbone, stateModel, StoreView, ClientView, HeaderTemplate) {

	var HeaderView = Backbone.View.extend({

		el: $('#header'),

		events: {
			'click .logo': 'reset',
			'click #roleSwitch': 'switchChildView'
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

			var $handle = this.$('#roleSwitch div');

			$handle.animate({
				top: 2
			}, 100, 'easeInExpo', function () {
				$handle.removeClass('iSettings').addClass('iUser');
			});
		},

		renderClientView: function () {
			this.childView = new ClientView({
				el: this.$('#headerContent')
			});

			var $handle = this.$('#roleSwitch div');

			$handle.animate({
				top: 27
			}, 100, 'easeInExpo', function () {
				$handle.removeClass('iUser').addClass('iSettings');
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