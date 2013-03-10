// Filename: src/js/views/home/home/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'views/PageView',
    'views/home/home/StoresView',
    'text!templates/home/home/MainTemplate.html'
    ], function ($, _, Backbone, notificationcenter, PageView, StoresView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Startseite',

		events: {
			'keyup #locationSelectionInput': '_checkInputKeyUp',
			'keydown #locationSelectionInput': '_checkInputKeyDown'
		},

		$input: null,

		initialize: function () {
			this._render();
		},

		_render: function () {

			this.$el.html(MainTemplate);

			this.storesView = new StoresView({
				el: this.$el,
				parentView: this
			});

			this.append();

			this._cacheDom();

			// focus text input
			this.$input.focus();
		},

		_cacheDom: function () {
			this.$input = this.$('#locationSelectionInput');
		},

		_checkInputKeyUp: function (e) {
			var input = $(e.target).val(),
				postal = parseInt(input, 10);

			if (postal > 9999) {
				this.storesView.lookUpStoresForPostal(postal);
			}
		},

		_checkInputKeyDown: function (e) {
			var val = this.$input.val(),
				offset, tooltipTop, tooltipLeft;

			if (e.keyCode < 48 || e.keyCode > 57) { // Ensure that it is a number
				if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 13 || // Allow backspace, delete and enter
				e.keyCode > 95 && e.keyCode < 106 || // allow numblock
				e.keyCode > 36 && e.keyCode < 41) { // allow arrow keys
					notificationcenter.hideTooltip();
				} else {
					offset = this.$input.offset();
					tooltipTop = offset.top + 72;
					tooltipLeft = window.innerWidth * 0.5 + val.length * 32; // offset for each letter
					notificationcenter.tooltip('views.home.home.input', tooltipTop, tooltipLeft);
					return false;
				}
			} else if (val.length > 4) {
				return false;
			} else {
				notificationcenter.hideTooltip();
			}
		}

	});

	return MainView;

});