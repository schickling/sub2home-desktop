(function() {
	"use strict"

	var template = $("#template").html(),
		$content = $('article');

	var Article = Backbone.Model.extend({
		defaults: {
			image_small: '../../../img/static/article_gray_small.png',
			image_big: '../../../img/static/article_gray_big.png'
		},

		urlRoot: window.location.pathname,

		hasIngredient: function(ingredient_id) {
			return _.include(this.get('ingredient_ids'), ingredient_id);
		},

		has_menu_upgrade: function(menu_upgrade_id) {
			return _.include(this.get('menu_upgrade_ids'), menu_upgrade_id);
		}
	});

	var Category = Backbone.Collection.extend({
		model: Article
	});

	var ArticleView = Backbone.View.extend({
		className: 'article',
		template: _.template(template),
		events: {
			'click .icon_remove': 'delete',
			'click .icon_publish': 'toggle_publish',
			'click .folded_article': 'toggle_article',
			'focusout .input_title': 'update_title',
			'keypress .input_title': 'update_title_on_enter',
			'focusout .input_price': 'update_price',
			'keypress .input_price': 'update_price_on_enter',
			'focusout .input_deposit': 'update_deposit',
			'keypress .input_deposit': 'update_deposit_on_enter',
			'focusout .input_description': 'update_description',
			'keypress .input_description': 'update_description_on_enter',
			'click .toggle_allowsIngredients': 'toggle_allowsIngredients',
			'click .toggle_allowsDeposit': 'toggle_allowsDeposit',
			'click .toggle_allowsMenuUpgrades': 'toggle_allowsMenuUpgrades',
			'click .icon_edit_big': 'update_image',
			'click .menu_upgrade': 'toggle_menu_upgrade',
			'click .option_item': 'toggle_ingredient'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		delete: function() {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});

			return false;
		},

		toggle_publish: function() {
			this.model.set('published', !this.model.get('published'));
			this.model.save();

			this.$el.find('.icon_publish').toggleClass('published');

			return false;
		},

		toggle_article: function() {
			var $unfolded_article = this.$el.find('.unfolded_article');

			$unfolded_article.toggle();
			this.$el.toggleClass('unfolded');
		},

		update_title_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_title').blur();
			this.update_title();
		},

		update_title: function() {
			var title = this.$el.find('.input_title').val();
			
			this.$el.find('.article_title h3').text(title);

			this.model.set('title', title);
			this.model.save();
		},

		update_price_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_price').blur();
			this.update_price();
		},

		update_price: function() {
			var $input = this.$el.find('.input_price'),
				price = $input.val(),
				parsed_price = this.parse_price(price);

			if (parsed_price !== false) {
				this.model.set('price', parsed_price);
				this.model.save();

				this.$el.find('.sort_option.price').text(parsed_price);

				$input.val(parsed_price);
			}
		},

		update_deposit_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_deposit').blur();
			this.update_deposit();
		},

		update_deposit: function() {
			var $input = this.$el.find('.input_deposit'),
				deposit = $input.val(),
				parsed_deposit = this.parse_price(deposit);

			if (parsed_deposit !== false) {
				this.model.set('deposit', parsed_deposit);
				this.model.save();

				$input.val(parsed_deposit);
			}
		},

		update_description_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_description').blur();
			this.update_description();
		},

		update_description: function() {
			var description = this.$el.find('.input_description').val();

			this.model.set('description', description);
			this.model.save();
		},

		update_image: function() {
			var input_image = this.$el.find('.input_image'),
				big_image = this.$el.find('.big_image'),
				small_image = this.$el.find('.small_image');

			input_image.fileupload({
				dataType: 'json',
				url: 'upload_image',
				formData: {
					article_id: this.model.id
				},
				done: function (e, data) {
					big_image.fadeOut();
					big_image.attr('src', data.result.big_file);
					big_image.fadeIn();

					small_image.hide();
					small_image.attr('src', data.result.small_file);
					small_image.fadeIn();
				},
				fail: function() {
					alert("Upload failed");
				}
			});

			input_image.trigger('click');
		},

		toggle_menu_upgrade: function(e) {
			var $menu_upgrade = $(e.target),
				menu_upgrade_id = $menu_upgrade.attr('data-id'),
				add = $menu_upgrade.hasClass('disabled');

			$.ajax({
				url: 'toggle_menu_upgrade',
				type: 'POST',
				data: {
					menu_upgrade_id: menu_upgrade_id,
					article_id: this.model.id,
					add: add
				},
				success: function() {
					$menu_upgrade.toggleClass('disabled');
				}
			});
		},

		toggle_ingredient: function(e) {
			var $ingredient = $(e.target),
				ingredient_id = $ingredient.attr('data-id'),
				add = $ingredient.hasClass('disabled');

			$.ajax({
				url: 'toggle_ingredient',
				type: 'POST',
				data: {
					ingredient_id: ingredient_id,
					article_id: this.model.id,
					add: add
				},
				success: function() {
					$ingredient.toggleClass('disabled');
				}
			});
		},

		toggle_allowsIngredients: function() {
			var $icon = this.$el.find('.toggle_allowsIngredients .icon_check_small'),
				$unfolded_options_wrapper = this.$el.find('.unfolded_options_wrapper');

			$icon.toggleClass('checked');
			$unfolded_options_wrapper.fadeToggle();

			this.model.set('allowsIngredients', !this.model.get('allowsIngredients'));
			this.model.save();
		},

		toggle_allowsDeposit: function() {
			var $icon = this.$el.find('.toggle_allowsDeposit .icon_check_small'),
				$detail_deposit_input = this.$el.find('.detail_deposit_input');

			$icon.toggleClass('checked');
			$detail_deposit_input.fadeToggle();

			this.model.set('allowsDeposit', !this.model.get('allowsDeposit'));
			this.model.save();
		},

		toggle_allowsMenuUpgrades: function() {
			var $icon = this.$el.find('.toggle_allowsMenuUpgrades .icon_check_small'),
				$detail_menu_upgrades = this.$el.find('.detail_menu_upgrades');

			$icon.toggleClass('checked');
			$detail_menu_upgrades.fadeToggle();

			this.model.set('allowsMenuUpgrades', !this.model.get('allowsMenuUpgrades'));
			this.model.save();
		},

		parse_price: function(price) {
			if (price != parseFloat(price)) {
				app.popup('Bitte einen gültigen Preis eingeben.', 'error');
				return false;
			} else {
				return ((Math.round(parseFloat(price) * 100)) / 100).toFixed(2);
			}
		}
	});

	var CategoryView = Backbone.View.extend({

		el: $content,

		events: {
			'click .icon_add_small': 'add_article'
		},

		initialize: function(json_articles) {
			this.collection = new Category(json_articles);
			this.render();
		},

		render: function() {
			_.each(this.collection.models, function (item) {
				this.render_article(item);
			}, this);
		},

		render_article: function(item) {
			var article_view = new ArticleView({
				model: item
			});

			this.$el.find('section').prepend(article_view.render().el);

			return article_view;
		},

		add_article: function() {
			var article = new Article();

			var self = this;

			article.save({}, {
				success: function() {
					var article_view = self.render_article(article);
					article_view.toggle_article();
					self.collection.add(article);
				}
			});

		}
	});

	var category = new CategoryView(json_articles);

})();