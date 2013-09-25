// Filename: src/js/views/store/home/ArticleDetailsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'models/stateModel',
    'text!templates/store/home/ArticleDetailsTemplate.html'
    ], function ($, _, Backbone, router, stateModel, ArticleDetailsTemplate) {

	"use strict";

	var ArticleDetailsView = Backbone.View.extend({

		className: 'detailsArticle',

		selectedItemModel: null,

		animationTime: 200,

		hideTimer: 0,

		template: _.template(ArticleDetailsTemplate),

		events: {
			'click .bFood, img': '_goToSelection',
			'click .footlongOption': '_makeFootlong',
			'click .uncheckFootlong': '_make6Inch',
			'mouseleave': '_hide',
			'mouseenter': '_stopHiding'
		},

		initialize: function () {
			this.selectedItemModel = this.model;

			this._render();
		},

		_render: function () {
			var attachedItemsCollection = this.model.get('attachedItemsCollection'),
				footlongItemModel = attachedItemsCollection.first(),
				json = {
					title: this.model.get('title'),
					image: this.model.get('largeImage'),
					footlongImage: footlongItemModel.get('largeImage'),
					description: this.model.get('description'),
					price: this.model.get('price')
				};

			this.$el.html(this.template(json));

		},

		_goToSelection: function () {
			router.navigate('store/theke/artikel/' + this.selectedItemModel.get('id'), true);
		},

		_makeFootlong: function () {
			var attachedItemsCollection = this.model.get('attachedItemsCollection'),
				footlongItemModel = attachedItemsCollection.first(),
				$uncheckFootlong = this.$('.uncheckFootlong'),
				$footlongOption = this.$('.footlongOption'),
				$images = this.$('img'),
				$6inch = $images.eq(0),
				$footlong = $images.eq(1),
				$pricetag = this.$('.pricetag');


			$footlong.fadeIn(this.animationTime);
			$6inch.delay(this.animationTime / 2).fadeOut(this.animationTime / 2);

			$uncheckFootlong.fadeIn(this.animationTime);

			$footlongOption.fadeOut(this.animationTime);

			$pricetag.find('span').text(footlongItemModel.get('price') + ' €');
			$pricetag.animate({
				left: 393
			}, this.animationTime);

			this.selectedItemModel = footlongItemModel;
		},

		_make6Inch: function () {
			var $uncheckFootlong = this.$('.uncheckFootlong'),
				$footlongOption = this.$('.footlongOption'),
				$images = this.$('img'),
				$6inch = $images.eq(0),
				$footlong = $images.eq(1),
				$pricetag = this.$('.pricetag');

			$footlong.fadeOut(this.animationTime);
			$6inch.fadeIn(this.animationTime / 2);

			$uncheckFootlong.fadeOut(this.animationTime);

			$footlongOption.fadeIn(this.animationTime);

			$pricetag.find('span').text(this.model.get('price') + ' €');
			$pricetag.animate({
				left: 193
			}, this.animationTime);

			this.selectedItemModel = this.model;
		},

		_hide: function () {
			var self = this;

			this.hideTimer = setTimeout(function () {
				self.$el.fadeOut(150, function () {
					self.remove();
				});
			}, 200);
		},

		_stopHiding: function () {
			clearTimeout(this.hideTimer);
		}

	});

	return ArticleDetailsView;

});