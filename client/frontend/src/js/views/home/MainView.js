// Filename: src/js/views/home/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/home/StoresView',
	'text!templates/home/MainTemplate.html'
	], function ($, _, Backbone, PageView, StoresView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Startseite',

		events: {
			'keyup #locationSelectionInput': 'checkInputKeyUp',
			'keydown #locationSelectionInput': 'checkInputKeyDown'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			this.$el.html(MainTemplate);

			this.storesView = new StoresView({
				el: this.$el,
				parentView: this
			});

			this.append();

			// focus text input
			// this.$('#locationSelectionInput').focus();
		},

		checkInputKeyUp: function (e) {
			var input = $(e.target).val(),
				postal = parseInt(input, 10);

			if (postal > 9999) {
				this.storesView.lookUpStoresForPostal(postal);
			}
		},

		checkInputKeyDown: function (e) {
			var input = $(e.target).val();

			if (e.keyCode < 48 || e.keyCode > 57) { // Ensure that it is a number
				if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 13 || // Allow backspace, delete and enter
				e.keyCode > 95 && e.keyCode < 106 || // allow numblock
				e.keyCode > 36 && e.keyCode < 41) { // allow arrow keys
					this.hideTooltip('locationSelectionTooltip');
				} else {
					this.showTooltip('Bitte nur Zahlen eingeben.', 'locationSelectionTooltip');
					return false;
				}
			} else if (input.length > 4) {
				return false;
			} else {
				this.hideTooltip('locationSelectionTooltip');
			}
		},

		showTooltip: function (msg, className) {
			var $tooltip = $('.' + className);

			$tooltip.find('.tooltipInner').text(msg);

			$tooltip.fadeIn(100);
		},

		hideTooltip: function (className) {
			var $tooltip = $('.' + className);

			$tooltip.fadeOut(100);
		}

	});

	return MainView;

});