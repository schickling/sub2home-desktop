(function() {
	"use strict"

	var 
		app = window.app = window.app || {},
		template_ingredient = $("#template_ingredient").html(),
		template_ingredient_category = $("#template_ingredient_category").html();

	var Ingredient = Backbone.Model.extend({
		defaults: {
			title: 'Neue Zutat',
			price: 0,
			category: '',
			order: 0,
			small_image: '../../img/static/ingredient_gray.png'
		},
		urlRoot: './',
	});

	var Ingredient_Category = Backbone.Model.extend({
		urlRoot: '../ingredient_categories/'
	});

	var Ingredients = Backbone.Collection.extend({
		model: Ingredient
	});

	var Ingredient_Categories = Backbone.Collection.extend({
		model: Ingredient_Category
	});

	var IngredientView = Backbone.View.extend({

		className: 'ingredient',
		template: _.template(template_ingredient),
		events: {
			'click .icon_remove': 'delete',
			'click .ingredient_title_headline': 'show_title_input',
			'keypress .ingredient_title_input': 'update_title_on_enter',
			'focusout .ingredient_title_input': 'update_title',
			'click .ingredient_price_headline': 'show_price_input',
			'keypress .ingredient_price_input': 'update_price_on_enter',
			'focusout .ingredient_price_input': 'update_price',
			'click .icon_sort_up': 'sort_up',
			'click .icon_sort_down': 'sort_down',
			'click .icon_add_white': 'update_image'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('data-id', this.model.id);
			return this;
		},

		delete: function() {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});
		},

		show_title_input: function() {
			this.$el.find('.ingredient_title_headline').hide();
			this.$el.find('.ingredient_title_input').show().focus();
		},

		show_price_input: function() {
			var $headline = this.$el.find('.ingredient_price_headline'),
				$input = this.$el.find('.ingredient_price_input'),
				text = $headline.text();

			$headline.hide();
			$input.val(text).show().focus();
		},

		update_title_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_title();
		},

		update_price_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_price();
		},

		update_title: function() {
			var $input = this.$el.find('.ingredient_title_input'),
				$headline = this.$el.find('.ingredient_title_headline'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();
		},

		update_price: function() {
			var $input = this.$el.find('.ingredient_price_input'),
				$headline = this.$el.find('.ingredient_price_headline'),
				parsed_price = this.parse_price($input.val());

			if (parsed_price !== false) {
				this.model.set('price', parsed_price);
				this.model.save();

				$headline.html(parsed_price);
			}

			$input.hide();
			$headline.show();
		},

		sort_up: function() {
			var prev_model = this.prev();

			if (prev_model) {
				this.model.set('order', this.model.get('order') - 1);
				prev_model.set('order', prev_model.get('order') + 1);

				this.model.save();
				prev_model.save();

				this.$el.after(this.$el.prev('.ingredient'));
			}
		},

		sort_down: function() {
			var next_model = this.next();

			if (next_model) {
				this.model.set('order', this.model.get('order') + 1);
				next_model.set('order', next_model.get('order') - 1);

				this.model.save();
				next_model.save();
				
				this.$el.before(this.$el.next('.ingredient'));
			}
		},

		next: function() {
			var id = this.$el.next('.ingredient').attr('data-id');
			return this.collection.get(id);
		},

		prev: function() {
			var id = this.$el.prev('.ingredient').attr('data-id');
			return this.collection.get(id);
		},

		update_image: function() {

			var input = this.$el.find('.input_image'),
				thumb = this.$el.find('img');

			input.fileupload({
				dataType: 'json',
				url: './upload_image/',
				formData: {
					ingredient_id: this.model.get('id')
				},
				done: function (e, data) {
					thumb.fadeOut();
					thumb.attr('src', data.result.file);
					thumb.fadeIn();
				},
				fail: function() {
					alert("Upload failed");
				}
			});

			input.trigger('click');
		},

		parse_price: function(price) {
			if (price != parseFloat(price)) {
				alert('Bitte einen gültigen Preis eingeben.');
				return false;
			} else {
				return ((Math.round(parseFloat(price) * 100)) / 100).toFixed(2);
			}
		}

	});

	var IngredientsView = Backbone.View.extend({

		initialize: function(ingredient_category_view) {
			this.$el = ingredient_category_view.$el.find('.ingredients');

			this.collection = new Ingredients(ingredient_category_view.model.get('ingredients'));
		},

		render: function() {
			_.each(this.collection.models, function (item) {
				this.render_ingredient(item);
			}, this);
		},

		render_ingredient: function(item) {
			var ingredient_view = new IngredientView({
				model: item
			});

			// Bind collection to new view for accessing other models to change order
			ingredient_view.collection = this.collection;

			this.$el.append(ingredient_view.render().el);
		},

		add_ingredient: function(ingredient_category_id) {
			var ingredient = new Ingredient({
					ingredient_category_id: ingredient_category_id
				});

			var self = this;

			ingredient.save({}, {
				success: function() {
					self.render_ingredient(ingredient);
					self.collection.add(ingredient);
				}
			});
		}

	});

	var Ingredient_CategoryView = Backbone.View.extend({

		className: 'ingredient_category',

		template: _.template(template_ingredient_category),

		events: {
			'click .icon_add_small': 'add_ingredient',
			'click .icon_sort_up': 'sort_up',
			'click .icon_sort_down': 'sort_down',
			'click .category_title h2': 'show_title_input',
			'keypress .category_title input': 'update_title_on_enter',
			'focusout .category_title input': 'update_title',
			'click .category_phrase span': 'show_phrase_input',
			'keypress .category_phrase input': 'update_phrase_on_enter',
			'focusout .category_phrase input': 'update_phrase',
			'click .category_including span': 'show_including_input',
			'keypress .category_including input': 'update_including_on_enter',
			'focusout .category_including input': 'update_including',
			'click .category_single': 'toggle_single',
			'click .icon_remove': 'delete'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			this.$el.attr('data-id', this.model.id);

			// initialize ingredients view
			this.ingredients_view = new IngredientsView(this);
			this.ingredients_view.render();

			return this;
		},

		add_ingredient: function() {
			this.ingredients_view.add_ingredient(this.model.get('id'));
		},

		sort_up: function() {
			var prev_model = this.prev();

			if (prev_model) {
				this.model.set('order', this.model.get('order') - 1);
				prev_model.set('order', prev_model.get('order') + 1);

				this.model.save();
				prev_model.save();

				this.$el.after(this.$el.prev('.ingredient_category'));
			}
		},

		sort_down: function() {
			var next_model = this.next();

			if (next_model) {
				this.model.set('order', this.model.get('order') + 1);
				next_model.set('order', next_model.get('order') - 1);

				this.model.save();
				next_model.save();
				
				this.$el.before(this.$el.next('.ingredient_category'));
			}
		},

		next: function() {
			var id = this.$el.next('.ingredient_category').attr('data-id');
			return this.collection.get(id);
		},

		prev: function() {
			var id = this.$el.prev('.ingredient_category').attr('data-id');
			return this.collection.get(id);
		},

		show_title_input: function() {
			this.$el.find('.category_title h2').hide();
			this.$el.find('.category_title input').show().focus();
		},

		update_title_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_title();
		},

		update_title: function() {
			var $input = this.$el.find('.category_title input'),
				$headline = this.$el.find('.category_title h2'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();
		},

		show_phrase_input: function() {
			this.$el.find('.category_phrase span').hide();
			this.$el.find('.category_phrase input').show().focus();
		},

		update_phrase_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_phrase();
		},

		update_phrase: function() {
			var $input = this.$el.find('.category_phrase input'),
				$span = this.$el.find('.category_phrase span'),
				val = $input.val();

			$span.text(val);
			$input.hide();
			$span.show();

			this.model.set('phrase', val);

			this.model.save();
		},

		show_including_input: function() {
			this.$el.find('.category_including span').hide();
			this.$el.find('.category_including input').show().focus();
		},

		update_including_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_including();
		},

		update_including: function() {
			var $input = this.$el.find('.category_including input'),
				$span = this.$el.find('.category_including span'),
				val = $input.val();

			if (val != parseInt(val)) {
				app.popup('Bitte eine Zahl eingeben', 'error');
				return false;
			}

			$span.text(val);
			$input.hide();
			$span.show();

			this.model.set('including', val);

			this.model.save();
		},

		toggle_single: function() {
			var $icon = this.$el.find('.category_single');
			$icon.toggleClass('icon_ok');

			this.model.set('single', !this.model.get('single'));
			this.model.save();
		},

		delete: function() {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});
		}

	});

	var Ingredient_CategoriesView = Backbone.View.extend({
		el: $('article'),

		events: {
			'click header .icon_add_small': 'add_ingredient_category'
		},

		initialize: function(json_ingredient_categories) {
			this.$list = this.$el.find('section');

			this.collection = new Ingredient_Categories(json_ingredient_categories);
			this.render();
		},

		render: function() {
			_.each(this.collection.models, function (item) {
				this.render_ingredient_category(item);
			}, this);
		},

		render_ingredient_category: function(item) {
			var ingredient_category_view = new Ingredient_CategoryView({
				model: item
			});

			// Bind collection to new view for accessing other models to change order
			ingredient_category_view.collection = this.collection;

			this.$list.append(ingredient_category_view.render().el);
		},

		add_ingredient_category: function() {
			var ingredient_category = new Ingredient_Category();

			var self = this;

			ingredient_category.save({}, {
				success: function() {
					self.render_ingredient_category(ingredient_category);
					self.collection.add(ingredient_category);
				}
			});
		}
	});

	var categories = new Ingredient_CategoriesView(json_ingredient_categories);

})();