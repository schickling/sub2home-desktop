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
			'click': 'toggleSelected'
		},

		initialize: function () {
			this.model.bind('change:isSelected', this.updateView, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			// rotate circle
			this.$('.accentIngredient').randomRotate();


			this.updateView();

			return this;
		},

		updateView: function() {
			this.$el.toggleClass('isSelected', this.model.get('isSelected'));
		},

		toggleSelected: function () {
			this.model.set('isSelected', !this.model.get('isSelected'));
			this.parentView.notifyOtherIngredients(this.model);
		}

	});

	return IngredientView;

});