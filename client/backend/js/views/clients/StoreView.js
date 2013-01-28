// Filename: js/views/clients/StoreView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var StoreView = Backbone.View.extend({

		template: _.template(template_store),

		className: 'store',

		events: {
			'click .icon_active': 'toggle_active',
			'click .icon_open': 'toggle_open',
			'click .store_title': 'show_store_title_input',
			'keypress .store_title_input': 'update_title_on_enter',
			'focusout .store_title_input': 'update_title',
			'click .store_number': 'show_store_number_input',
			'keypress .store_number_input': 'update_number_on_enter',
			'focusout .store_number_input': 'update_number',
			'click': 'redirect_store',
			'click .icon_remove': 'destroy'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		toggle_active: function () {
			var $icon_active = this.$el.find('.icon_active');

			$icon_active.toggleClass('active');
			this.model.set('active', !(this.model.get('active')));
			this.model.save();

			return false;
		},

		toggle_open: function () {
			var $icon_open = this.$el.find('.icon_open');

			$icon_open.toggleClass('open');
			this.model.set('open', !(this.model.get('open')));
			this.model.save();

			return false;
		},

		show_store_title_input: function () {
			this.$el.find('.store_title').hide();
			this.$el.find('.store_title_input').show().focus();

			return false;
		},

		show_store_number_input: function () {
			this.$el.find('.store_number').hide();
			this.$el.find('.store_number_input').show().focus();

			return false;
		},

		update_title_on_enter: function (e) {
			if (e.keyCode != 13) return;
			this.update_title();
		},

		update_title: function () {
			var $input = this.$el.find('.store_title_input'),
				$headline = this.$el.find('.store_title'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();
		},

		update_number_on_enter: function (e) {
			if (e.keyCode != 13) return;
			this.update_number();
		},

		update_number: function () {
			var $input = this.$el.find('.store_number_input'),
				$headline = this.$el.find('.store_number'),
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

		redirect_store: function () {
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