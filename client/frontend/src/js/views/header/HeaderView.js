// Filename: src/js/views/header/HeaderView.js
define([
	'jquery',
	'jqueryEasing',
	'underscore',
	'backbone',
	'models/stateModel',
	'views/header/StoreView',
	'views/header/ClientView',
	'text!templates/header/HeaderTemplate.html',
	'text!templates/header/RoleSwitchTemplate.html'
	], function ($, jqueryEasing, _, Backbone, stateModel, StoreView, ClientView, HeaderTemplate, RoleSwitchTemplate) {

	var HeaderView = Backbone.View.extend({

		el: $('#header'),

		events: {
			'click .logo': '_reset',
			'click #roleSwitch': '_switchChildView'
		},

		childView: null,

		initialize: function () {
			this._render();

			stateModel.on('change:storeModel', this._renderStoreView, this);

			stateModel.on('change:isClientHeaderActive', function () {
				if (stateModel.get('isClientHeaderActive')) {
					this._renderClientView();
				} else {
					this._renderStoreView();
				}
			}, this);

			this._renderRoleSwitch();
		},

		_render: function () {

			this.$el.html(HeaderTemplate);

			if (stateModel.get('isClientHeaderActive')) {
				this._renderClientView();
			} else if (stateModel.get('storeModel')) {
				this._renderStoreView();
			}

		},

		_renderRoleSwitch: function () {
			this.$el.append(RoleSwitchTemplate);

			this.$el.addClass('isLoggedIn');
		},

		_renderStoreView: function () {
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

		_renderClientView: function () {
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

		_reset: function () {
			window.localStorage.clear();
		},

		_switchChildView: function () {
			stateModel.set('isClientHeaderActive', !stateModel.get('isClientHeaderActive'));
		}

	});

	return HeaderView;

});