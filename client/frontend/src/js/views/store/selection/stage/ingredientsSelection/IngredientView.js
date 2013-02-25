// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/stage/ingredientsSelection/IngredientTemplate.html'
	], function ($, _, Backbone, IngredientTemplate) {

	// extend jquery with random rotate
	$.fn.extend({
		randomRotate: function () {
			var $this = $(this),
				random = Math.floor(Math.random() * 359);

			$this.css({
				'-webkit-transform': 'rotate(' + random + 'deg)',
				'-moz-transform': 'rotate(' + random + 'deg)',
				'-ms-transform': 'rotate(' + random + 'deg)',
				'-o-transform': 'rotate(' + random + 'deg)',
				'transform': 'rotate(' + random + 'deg)'
			});
		}
	});

	var IngredientView = Backbone.View.extend({

		className: 'item ingredient',

		template: _.template(IngredientTemplate),

		events: {
			'click': '_toggleSelected'
		},

		initialize: function () {
			this.model.bind('change:isSelected', this._updateView, this);

			this._render();

			this._updateView();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			// rotate circle
			this.$('.accentIngredient').randomRotate();

		},

		_updateView: function() {
			this.$el.toggleClass('selected', this.model.get('isSelected'));
		},

		_toggleSelected: function () {
			this.model.set('isSelected', !this.model.get('isSelected'));
			this.parentView.notifyOtherIngredients(this.model);
		}

	});

	return IngredientView;

});