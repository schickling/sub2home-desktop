(function () {
	"use strict"

	var template_menu = $("#template_menu").html(),
		template_menu_component_block = $('#template_menu_component_block').html(),
		template_menu_component_option = $('#template_menu_component_option').html();

	var Menu = Backbone.Model.extend({
		defaults: {
			image_small: '../../../img/static/menu_gray_small.png',
			image_big: '../../../img/static/menu_gray_big.png'
		},
		urlRoot: './'
	});

	var Menu_Component_Block = Backbone.Model.extend({
		urlRoot: '../component/blocks/'
	});

	var Menu_Component_Option = Backbone.Model.extend({
		urlRoot: '../component/options/',

		has_article: function (check_article) {
			var ret = _.find(this.get('articles'), function (article) {
				return check_article.id == article.id;
			});

			return ret != null;
		},
	});

	// set relative paths for bundles (because of category alias)
	if (window.location.pathname.match(/bundle/)) {
		// menu images
		Menu.prototype.defaults = {
			image_small: '../../../../img/static/menu_gray_small.png',
			image_big: '../../../../img/static/menu_gray_big.png'
		};
		// menu component block url
		Menu_Component_Block.prototype.urlRoot = '../../component/blocks/';
		// menu component option url
		Menu_Component_Option.prototype.urlRoot = '../../component/options/';
	}

	var Menus = Backbone.Collection.extend({
		model: Menu
	});

	var Menu_Component_Blocks = Backbone.Collection.extend({
		model: Menu_Component_Block
	});

	var Menu_Component_Options = Backbone.Collection.extend({
		model: Menu_Component_Option
	});

	var MenuView = Backbone.View.extend({

		className: 'menu',

		template: _.template(template_menu),

		events: {
			'click .switch_overlay.isMandatory': 'toggle_isMandatory',
			'click .folded_menu .icon_remove': 'delete',
			'focusout .input_title': 'update_title',
			'keypress .input_title': 'update_title_on_enter',
			'focusout .input_description': 'update_description',
			'keypress .input_description': 'update_description_on_enter',
			'focusout .input_price': 'update_price',
			'keypress .input_price': 'update_price_on_enter',
			'click .folded_menu': 'toggle_menu',
			'click .icon_edit_big': 'update_image'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			// console.log(this);

			// initialize menu_component_blocks view
			this.menu_component_blocks_view = new Menu_Component_BlocksView(this);

			return this;
		},

		toggle_isMandatory: function (e) {
			var $switcher = $(e.target).siblings('.switch'),
				$headline = this.$el.find('.info.menu_type');

			$switcher.toggleClass('right left');

			this.model.set('isMandatory', !this.model.get('isMandatory'));
			this.model.save();

			if (this.model.get('isMandatory')) {
				$headline.text('obligatorisch');
			} else {
				$headline.text('optional');
			}
		},

		update_image: function () {
			var input_image = this.$el.find('.input_image'),
				big_image = this.$el.find('.big_image'),
				small_image = this.$el.find('.small_image');

			input_image.fileupload({
				dataType: 'json',
				url: './upload_image/',
				formData: {
					menu_id: this.model.id,
					class_name: this.model.get('class_name')
				},
				done: function (e, data) {
					big_image.fadeOut();
					big_image.attr('src', data.result.big_file);
					big_image.fadeIn();

					small_image.hide();
					small_image.attr('src', data.result.small_file);
					small_image.fadeIn();
				},
				fail: function () {
					alert("Upload failed");
				}
			});

			input_image.trigger('click');
		},

		update_title: function () {
			var title = this.$el.find('.input_title').val();

			this.$el.find('.menu_title h3').text(title);

			this.model.set('title', title);
			this.model.save();
		},

		update_title_on_enter: function (e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_title').blur();
			this.update_title();
		},

		update_description: function () {
			var description = this.$el.find('.input_description').val();

			this.model.set('description', description);
			this.model.save();
		},

		update_description_on_enter: function (e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_description').blur();
			this.update_description();
		},

		update_price: function () {
			var $input = this.$el.find('.input_price'),
				price = $input.val(),
				parsed_price = this.parse_price(price);

			if (parsed_price !== false) {
				this.model.set('price', parsed_price);
				this.model.save();

				this.$el.find('.info.price').text(parsed_price);

				$input.val(parsed_price);
			}
		},

		update_price_on_enter: function (e) {
			if (e.keyCode != 13) return;
			this.$el.find('.input_price').blur();
			this.update_price();
		},

		delete: function () {
			var check = confirm("Menu wirklich löschen?");
			if (check) {
				var self = this;
				this.$el.fadeOut(function () {
					self.model.destroy();
					self.remove();
				});
			}
		},

		toggle_menu: function () {
			var $unfolded_menu = this.$el.find('.unfolded_menu');

			$unfolded_menu.fadeToggle();
		},

		parse_price: function (price) {
			if (price != parseFloat(price)) {
				alert('Bitte einen gültigen Preis eingeben.');
				return false;
			} else {
				return ((Math.round(parseFloat(price) * 100)) / 100).toFixed(2);
			}
		}

	});

	var Menu_Component_BlockView = Backbone.View.extend({
		template: _.template(template_menu_component_block),
		className: 'menu_component_block',
		events: {
			'click .plus': 'delete',
			'click .icon_add_small': 'toggle_categories',
			'click .dropdown_menu li': 'add_option'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			// initialize menu_component_options view
			this.menu_component_options_view = new Menu_Component_OptionsView(this);

			return this;
		},

		delete: function () {
			var self = this;

			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});
		},

		toggle_categories: function () {
			var $dropdown = this.$el.find('.dropdown_menu');
			$dropdown.slideToggle();
		},

		add_option: function (e) {
			var $category = $(e.target),
				category_id = $category.attr('data-id'),
				self = this;

			// create new component option
			var menu_component_option = new Menu_Component_Option({
				menu_component_block_id: self.model.get('id'),
				category_id: category_id
			});

			menu_component_option.save({}, {
				success: function (model) {
					// add option to colletion
					self.menu_component_options_view.collection.add(menu_component_option);
					// render option and slide down filter
					self.menu_component_options_view.render_menu_component_option(menu_component_option).toggle_filter();
					// hide categories
					self.toggle_categories();
				}
			});

		}

	});

	var Menu_Component_BlocksView = Backbone.View.extend({

		events: {
			'click .icon_add_big': 'add_menu_component_block'
		},

		initialize: function (menu_view) {
			this.$el = menu_view.$el.find('.menu_component_blocks');

			this.menu = menu_view.model;

			this.collection = new Menu_Component_Blocks(this.menu.get('menu_component_blocks'));

			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_menu_component_block(item);
			}, this);
		},

		render_menu_component_block: function (item) {
			var menu_component_block_view = new Menu_Component_BlockView({
				model: item
			});

			// Insert before add button
			var $add_button = this.$el.find('.icon_add_big');

			$add_button.before(menu_component_block_view.render().el);

			return menu_component_block_view;
		},

		add_menu_component_block: function () {
			// Switch for menu bundle or upgrade
			var class_name = this.menu.get('class_name'),
				item;

			if (class_name == 'Menu_Bundle') {
				item = {
					menu_bundle_id: this.menu.get('id'),
					menu_upgrade_id: 0
				};
			} else if (class_name == 'Menu_Upgrade') {
				item = {
					menu_bundle_id: 0,
					menu_upgrade_id: this.menu.get('id')
				};
			}

			// Create new component block
			var menu_component_block = new Menu_Component_Block(item);

			var self = this;

			menu_component_block.save({}, {
				success: function () {
					self.collection.add(menu_component_block);
					var menu_component_block_view = self.render_menu_component_block(menu_component_block);
					menu_component_block_view.toggle_categories();
				}
			});
		}
	});


	var Menu_Component_OptionView = Backbone.View.extend({
		template: _.template(template_menu_component_option),

		className: 'menu_component_option',

		events: {
			'click .icon_remove': 'delete',
			'click .trigger_filter_articles': 'toggle_filter',
			'click .article': 'toggle_article'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		delete: function () {
			var self = this;

			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});

		},

		toggle_filter: function () {
			var $filter_articles = this.$el.find('.filter_articles');

			$filter_articles.slideToggle();
		},

		toggle_article: function (e) {
			var $article = $(e.target),
				article_id = $article.attr('data-id'),
				article = _.find(this.model.get('available_articles'), function (item) {
					return item.id == article_id;
				});

			// add article
			if ($article.hasClass('inactive')) {
				this.model.get('articles').push(article);
				// remove article
			} else {
				this.model.set('articles', _.reject(this.model.get('articles'), function (article) {
					return article.id == article_id;
				}));
			}

			$article.toggleClass('inactive');

			this.model.save();
		}

	});

	var Menu_Component_OptionsView = Backbone.View.extend({

		initialize: function (menu_component_block_view) {
			this.$el = menu_component_block_view.$el.find('.menu_component_options');

			this.menu_component_block = menu_component_block_view.model;

			this.collection = new Menu_Component_Options(this.menu_component_block.get('menu_component_options'));

			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_menu_component_option(item);
			}, this);
		},

		render_menu_component_option: function (item) {
			var menu_component_option_view = new Menu_Component_OptionView({
				model: item
			});

			this.$el.append(menu_component_option_view.render().el);

			return menu_component_option_view;
		}
	});

	var MenusView = Backbone.View.extend({

		el: $('.menu_listing'),

		events: {
			'click header .icon_add_small': 'add_menu'
		},

		initialize: function (json_menus) {
			this.collection = new Menus(json_menus);
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_menu(item);
			}, this);
		},

		render_menu: function (item) {
			var menu_view = new MenuView({
				model: item
			});

			this.$el.find('section').prepend(menu_view.render().el);
		},

		add_menu: function () {
			var menu = new Menu();

			var self = this;

			menu.save({}, {
				success: function () {
					self.collection.add(menu);
					self.render_menu(menu);
				}
			});
		}

	});

	console.log(json_menus)
	var menus = new MenusView(json_menus);

})();