// Filename: js/views/clients/StoreView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/clients/StoreTemplate.html'
	], function ($, _, Backbone, StoreTemplate) {

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		className: 'store',

		events: {
			'click .iconActive': 'toggleActive',
			'click .iconOpen': 'toggleOpen',
			'click .storeTitle': 'showStoreTitleInput',
			'keypress .storeTitleInput': 'updateTitleOnEnter',
			'focusout .storeTitleInput': 'updateTitle',
			'click .storeNumber': 'showStoreNumberInput',
			'keypress .storeNumberInput': 'updateNumberOnEnter',
			'focusout .storeNumberInput': 'updateNumber',
			'click': 'redirectStore',
			'click .iconRemove': 'destroy'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			var storeModel = this.model,
				addressModel = storeModel.get('addressModel');

			var json = {
				isActive: storeModel.get('isActive'),
				isOpen: storeModel.get('isOpen'),
				number: storeModel.get('number'),
				title: storeModel.get('title'),
				created_at: storeModel.get('created_at'),
				monthlyTurnover: storeModel.get('monthlyTurnover'),
				totalTurnover: storeModel.get('totalTurnover'),
				monthlyOrders: storeModel.get('monthlyOrders'),
				totalOrders: storeModel.get('totalOrders'),
				street: addressModel.get('street'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city')
			};

			this.$el.html(this.template(json));
		},

		toggleActive: function () {
			var $iconActive = this.$el.find('.iconActive');

			$iconActive.toggleClass('active');
			this.model.set('active', !(this.model.get('active')));
			this.model.save();

			return false;
		},

		toggleOpen: function () {
			var $iconOpen = this.$el.find('.iconOpen');

			$iconOpen.toggleClass('open');
			this.model.set('open', !(this.model.get('open')));
			this.model.save();

			return false;
		},

		showStoreTitleInput: function () {
			this.$el.find('.storeTitle').hide();
			this.$el.find('.storeTitleInput').show().focus();

			return false;
		},

		showStoreNumberInput: function () {
			this.$el.find('.storeNumber').hide();
			this.$el.find('.storeNumberInput').show().focus();

			return false;
		},

		updateTitleOnEnter: function (e) {
			if (e.keyCode != 13) return;
			this.updateTitle();
		},

		updateTitle: function () {
			var $input = this.$el.find('.storeTitleInput'),
				$headline = this.$el.find('.storeTitle'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();
		},

		updateNumberOnEnter: function (e) {
			if (e.keyCode != 13) return;
			this.updateNumber();
		},

		updateNumber: function () {
			var $input = this.$el.find('.storeNumberInput'),
				$headline = this.$el.find('.storeNumber'),
				val = $input.val(),
				number = parseInt(val, 10);

			if (val != number || number < 10000 || number > 99999) {
				app.popup('Das ist keine erlaubte Storenummer', 'error');
				$input.focus();
				return false;
			}

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('number', val);

			this.model.save();
		},

		redirectStore: function () {
			if (this.model.get('active')) {
				var url = '../../' + this.model.get('alias') + '/einstellungen';
				window.open(url, '_newtab');
			}
		},

		destroy: function () {
			var self = this;
			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});

			return false;
		}


	});

	return StoreView;

});