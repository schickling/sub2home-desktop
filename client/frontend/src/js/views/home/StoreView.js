define([
	'jquery',
	'underscore',
	'gmaps',
	'text!templates/home/StoreTemplate.html'
	], function ($, _, gmaps, StoreTemplate) {

	var StoreView = function (model, parentView) {

			// link to HomeView
			this.parentView = parentView;

			this.model = model;

			// needed in StoresView.js
			this.position = new gmaps.LatLng(model.get('latitude'), model.get('longitude'));

			// create new marker
			var marker = this.marker = new gmaps.Marker({
				position: this.position,
				icon: new gmaps.MarkerImage("img/static/pin.png", null, null, new gmaps.Point(29, 87)),
				map: parentView.map,
				model: model
			});

			// bind marker event listeners
			var self = this;

			gmaps.event.addListener(marker, 'click', function () {
				self.redirect();
			});

			gmaps.event.addListener(marker, 'mouseover', function () {
				self.mouseenter();
			});

			gmaps.event.addListener(marker, 'mouseout', function () {
				self.mouseleave();
			});

			// set map
			this.setValues({
				map: parentView.map
			});

			// bind position
			this.bindTo('position', marker, 'position');

			// load template
			this.$el = $(this.template(model.toJSON())).clone();

		};

	StoreView.prototype = new gmaps.OverlayView();

	StoreView.prototype.template = _.template(StoreTemplate);

	// wrapper around parents redirect method
	StoreView.prototype.redirect = function () {
		this.parentView.redirect(this.model);
	};

	// Implement onAdd
	StoreView.prototype.onAdd = function () {
		var pane = this.getPanes().overlayMouseTarget,
			self = this,
			$el = this.$el;

		// bind storeview event handlers
		$el.on('click', function () {
			self.redirect();
		});

		$el.on('mouseenter', function () {
			self.mouseenter();
		});

		$el.on('mouseleave', function () {
			self.mouseleave();
		});

		$(pane).append($el);
	};

	// Implement draw
	StoreView.prototype.draw = function () {
		var projection = this.getProjection(),
			position = projection.fromLatLngToDivPixel(this.get('position')),
			$el = this.$el;

		$el.css({
			left: position.x - $el.width() / 2,
			top: position.y + 8
		});
	};

	StoreView.prototype.mouseenter = function () {
		this.$el.stop().animate({
			marginTop: -5
		});
	};

	StoreView.prototype.mouseleave = function () {
		this.$el.stop().animate({
			marginTop: 0
		});
	};

	// gets called when a delivery area is choosen
	StoreView.prototype.updateView = function () {
		var deliveryAreasCollection = this.model.get('deliveryAreasCollection'),
			storeAvailable = deliveryAreasCollection.where({
				selected: true
			}).length;

		if (storeAvailable) {
			this.markAvailable();
		} else {
			this.markUnavailable();
		}
	};

	StoreView.prototype.markAvailable = function () {
		this.$el.animate({
			opacity: 1
		});
	};

	StoreView.prototype.markUnavailable = function () {
		this.$el.animate({
			opacity: 0.5
		});
	};

	StoreView.prototype.remove = function () {
		// destroy note
		this.setMap(null);
		this.$el.remove();

		// destroy marker
		this.marker.setMap(null);
	};

	return StoreView;

});