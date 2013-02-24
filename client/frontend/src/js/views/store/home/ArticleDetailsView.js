// Filename: src/js/views/store/home/ArticleDetailsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/stateModel',
    'text!templates/store/home/ArticleDetailsTemplate.html'
    ], function ($, _, Backbone, router, stateModel, ArticleDetailsTemplate) {

	var ArticleDetailsView = Backbone.View.extend({

		className: 'detailsArticle',

		selectedItemModel: null,

		hideTimer: 0,

		template: _.template(ArticleDetailsTemplate),

		events: {
			'click .bFood': '_goToSelection',
			'click .footlongOption': '_makeFootlong',
			'click .uncheckFootlong': '_make6Inch',
			'mouseleave': '_hide',
			'mouseenter': '_stopHiding'
		},

		initialize: function () {
			this.selectedItemModel = this.model;

			this.render();
		},

		render: function () {
			var attachedItemsCollection = this.model.get('attachedItemsCollection'),
				footlongItemModel = attachedItemsCollection.first(),
				json = {
				title: this.model.get('title'),
				image: this.model.get('largeImage'),
				footlongImage: footlongItemModel.get('largeImage'),
				description: this.model.get('description'),
				price: this.model.get('price')
			};

			console.log(this.model.get('attachedItemsCollection').toJSON());

			this.$el.html(this.template(json));
		},

		_goToSelection: function () {
			if (this.selectedItemModel.get('allowsIngredients')) {
				router.navigate('store/theke/artikel/' + this.selectedItemModel.get('id'), true);
			} else {
				alert('Warenkorb yo!');
			}
		},

		_makeFootlong: function() {
			var attachedItemsCollection = this.model.get('attachedItemsCollection'),
				footlongItemModel = attachedItemsCollection.first(),
				$images = this.$('img'),
				$6inch = $images.eq(0),
				$footlong = $images.eq(1),
				$pricetag = this.$('.pricetag');


			$footlong.fadeIn();

			$pricetag.find('span').text(footlongItemModel.get('price') + ' €');
			$pricetag.animate({
				left: 393
			});

			this.selectedItemModel = footlongItemModel;
		},

		_make6Inch: function() {
			var $images = this.$('img'),
				$6inch = $images.eq(0),
				$footlong = $images.eq(1),
				$pricetag = this.$('.pricetag');

			$footlong.fadeOut();

			$pricetag.find('span').text(this.model.get('price') + ' €');
			$pricetag.animate({
				left: 193
			});

			this.selectedItemModel = this.model;
		},

		_hide: function () {
			var self = this;

			this.hideTimer = setTimeout(function () {
				// self.$el.fadeOut(function () {
				// 	self.remove();
				// });
			}, 300);
		},

		_stopHiding: function () {
			clearTimeout(this.hideTimer);
		}

	});

	return ArticleDetailsView;

});