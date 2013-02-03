define([
	'jquery',
	'underscore',
	'gmaps',
	'notificationcenter',
	'text!templates/home/StoreTemplate.html'
	], function ($, _, gmaps, notificationcenter, StoreTemplate) {

	var StoreView = function (model, parentView) {

			// link to HomeView
			this.parentView = parentView;

			this.model = model;

			// needed in StoresView.js
			this.position = new gmaps.LatLng(model.get('latitude'), model.get('longitude'));

			// set map
			this.setValues({
				map: parentView.map
			});

			// render template
			var json = {
				title: this.model.get('title')
			};
			this.$el = $(this.template(json));

			// cache note
			this.$note = this.$el.find('.smallNote');

		};

	StoreView.prototype = new gmaps.OverlayView();

	StoreView.prototype.template = _.template(StoreTemplate);

	// wrapper around parents selectStore method
	StoreView.prototype.selectStore = function () {
		switch (this.state) {
		case 'initialized':
			notificationcenter.warning('Liefergebiet auswaehlen', 'Bitte waehle zu erst ein Liefergebiet aus.');
			break;
		case 'available':
			this.parentView.selectStore(this.model);
			break;
		case 'unavailable':
			notificationcenter.error('Nicht in Reichweite', 'Leider liefert dieser Store nicht in dein Liefergebiet.');
		}
	};

	// Implement onAdd
	StoreView.prototype.onAdd = function () {
		var pane = this.getPanes().overlayMouseTarget,
			self = this,
			$el = this.$el;

		$(pane).append($el);

		// set state
		this.state = 'initialized';

		$el.on('click', function () {
			self.selectStore();
		});
	};

	// Implement draw
	StoreView.prototype.draw = function () {
		var projection = this.getProjection(),
			position = projection.fromLatLngToDivPixel(this.position),
			$el = this.$el;

		$el.css({
			left: position.x - $el.width() / 2,
			top: position.y
		});
	};

	// gets called when a delivery area is choosen
	StoreView.prototype.updateView = function () {
		var deliveryAreasCollection = this.model.get('deliveryAreasCollection'),
			storeAvailable = deliveryAreasCollection.where({
				isSelected: true
			}).length;

		if (storeAvailable) {
			this.markAvailable();
		} else {
			this.markUnavailable();
		}
	};

	StoreView.prototype.markAvailable = function () {
		var self = this,
			$el = this.$el,
			$note = this.$note;

		this.state = 'available';

		$el.animate({
			opacity: 1
		});

		// bind storeview event handlers
		$el.on('mouseenter', function () {
			$note.stop().animate({
				marginTop: -5
			});
		});

		$el.on('mouseleave', function () {
			$note.stop().animate({
				marginTop: 0
			});
		});

	};

	StoreView.prototype.markUnavailable = function () {
		var $el = this.$el;

		this.state = 'unavailable';

		$el.animate({
			opacity: 0.5
		});

		$el.off('mouseenter mouseleave');
	};

	StoreView.prototype.remove = function () {
		this.setMap(null);
		this.$el.remove();
	};

	return StoreView;

});