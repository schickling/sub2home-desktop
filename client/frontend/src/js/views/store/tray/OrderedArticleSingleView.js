// Filename: src/js/views/store/tray/OrderedArticleSingleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/OrderedArticleSingleTemplate.html'
	], function ($, _, Backbone, OrderedArticleSingleTemplate) {

	var OrderedArticleSingleView = Backbone.View.extend({

		template: _.template(OrderedArticleSingleTemplate),

		events: {
			'mouseenter': 'showControls',
			'mouseleave': 'hideControls'
		},
		
		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.addClass('orderedArticle');

			var orderedArticleModel = this.model.get('orderedArticlesCollection').first(),
				articleModel = orderedArticleModel.get('articleModel');

			var json = {
				title: articleModel.get('title'),
				description: articleModel.get('description'),
				image: articleModel.get('image'),
				total: this.model.get('total'),
				amount: this.model.get('amount')
			};

			this.$el.html(this.template(json));
		},

		showControls: function() {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 110
			}, 200);

			$controls.delay(100).stop().fadeIn(100);
		},

		hideControls: function() {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 15
			}, 200);

			$controls.stop().fadeOut(100);
		}

	});

	return OrderedArticleSingleView;

});