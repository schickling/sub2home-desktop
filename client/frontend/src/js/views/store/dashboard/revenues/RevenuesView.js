// Filename: src/js/views/store/dashboard/revenues/RevenuesView.js
define([
    'jquery',
    'lib/jquery/jquery.overscroll',
    'underscore',
    'backbone',
    'views/store/dashboard/revenues/RevenuesYearView'
    ], function ($, overscrollLib, _, Backbone, RevenuesYearView) {

	var RevenuesView = Backbone.View.extend({

		wasRendered: false,

		$turnoverContainer: null,
		$orderControls: null,

		events: {
			'click .toggleRevenues': '_toggle'
		},

		initialize: function () {
			this._cacheDom();
		},

		_render: function () {
			this._renderRevenuesYears();

			// initialize overscroll
			this.$turnoverContainer.overscroll({
				showThumbs: false,
				direction: 'horizontal',
				wheelDirection: 'horizontal'
			});
		},

		_cacheDom: function () {
			this.$turnoverContainer = this.$('.turnoverContainer');
			this.$orderControls = this.$('.orderControls');
		},

		_renderRevenuesYears: function () {
			var yearsCollection = this.collection.getSplittedCollectionsByYears();

			// this syntax needed since yearsCollection is an object not an array
			for (var year in yearsCollection) {
				this._renderRevenuesYear(yearsCollection[year]);
			}

			this.wasRendered = true;
		},

		_renderRevenuesYear: function (invoicesCollection) {
			var revenuesYearView = new RevenuesYearView({
				collection: invoicesCollection
			});

			console.log(invoicesCollection);

			// prepend because of inverted order
			this.$turnoverContainer.prepend(revenuesYearView.el);
		},

		_toggle: function () {
			var animationTime = 300,
				$el = this.$el,
				$toggleRevenues = this.$('.toggleRevenues'),
				$revenues = this.$('.revenues'),
				$content = $('.content'), // dirty
				$orderControls = this.$orderControls,
				$iTurnover = $toggleRevenues.find('.iTurnover');

			// lazy render
			if (!this.wasRendered) {
				this._render();
			}

			if ($toggleRevenues.hasClass('toggled')) { // hide

				$toggleRevenues.removeClass('toggled');

				$iTurnover.animate({
					paddingLeft: 0
				}, animationTime);



				$revenues.animate({
					opacity: 0
				}, animationTime / 2, function () {

					$el.animate({
						height: 150
					}, animationTime);


					$content.animate({
						top: 150
					}, animationTime);

					$orderControls.fadeIn(animationTime);


				});

			} else { // show

				$el.animate({
					height: 400
				}, animationTime, function () {

					$revenues.animate({
						opacity: 1
					}, animationTime / 2);

				});

				$orderControls.fadeOut(animationTime);


				$iTurnover.animate({
					paddingLeft: 40
				}, animationTime, function () {
					$toggleRevenues.addClass('toggled');
				});


				$content.animate({
					top: 400
				}, animationTime);

			}

		}

	});

	return RevenuesView;

});