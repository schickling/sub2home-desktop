(function () {
	"use strict"

	var template_category = $('#template_category').html(),
		template_proxyitem = $('#template_proxyitem').html();

	var Category = Backbone.Model.extend({
		urlRoot: './'
	});

	var Proxyitem = Backbone.Model.extend({
		urlRoot: '../proxyitems'
	});

	var Categories = Backbone.Collection.extend({
		model: Category
	});

	var Proxyitems = Backbone.Collection.extend({
		model: Proxyitem
	});

	var ProxyitemView = Backbone.View.extend({
		className: 'category_item',

		template: _.template(template_proxyitem),

		events: {
			'click .icon_sort_up': 'sort_up',
			'click .icon_sort_down': 'sort_down'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('data-id', this.model.id);

			return this;
		},

		sort_up: function() {
			var prev_model = this.prev();

			if (prev_model) {
				this.model.set('order', this.model.get('order') - 1);
				prev_model.set('order', prev_model.get('order') + 1);

				this.model.save();
				prev_model.save();

				this.$el.after(this.$el.prev('.category_item'));
			}

			return false;
		},

		sort_down: function() {
			var next_model = this.next();
			if (next_model) {
				this.model.set('order', this.model.get('order') + 1);
				next_model.set('order', next_model.get('order') - 1);

				this.model.save();
				next_model.save();
				
				this.$el.before(this.$el.next('.category_item'));
			}

			return false;
		},

		next: function() {
			var id = this.$el.next('.category_item').attr('data-id');
			return this.collection.get(id);
		},

		prev: function() {
			var id = this.$el.prev('.category_item').attr('data-id');
			return this.collection.get(id);
		}
	});

	var ProxyitemsView = Backbone.View.extend({

		initialize: function (category_view) {
			this.$el = category_view.$el.find('.unfolded_category');
			this.collection = new Proxyitems(category_view.model.get('proxyitems'));
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_proxyitem(item);
			}, this);
		},

		render_proxyitem: function (item) {
			var proxyitem_view = new ProxyitemView({
				model: item
			});

			// Bind collection to new view for accessing other models to change order
			proxyitem_view.collection = this.collection;

			this.$el.append(proxyitem_view.render().el);
		}
	});

	var CategoryView = Backbone.View.extend({
		className: 'category',

		template: _.template(template_category),

		events: {
			'click .icon_remove': 'delete',
			'click .category_title_headline': 'show_title_input',
			'focusout .category_title_input': 'update_title',
			'keypress .category_title_input': 'update_title_on_enter',
			'click .folded_category': 'toggle_items',
			'click .folded_category .icon_sort_up': 'sort_up',
			'click .folded_category .icon_sort_down': 'sort_down'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('data-id', this.model.id);

			// initialize proxyitems view
			this.proxyitems_view = new ProxyitemsView(this);

			return this;
		},

		show_title_input: function() {
			this.$el.find('.category_title_headline').hide();
			this.$el.find('.category_title_input').show().focus();

			return false;
		},

		update_title_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_title();
		},

		update_title: function() {
			var $input = this.$el.find('.category_title_input'),
				$headline = this.$el.find('.category_title_headline'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();

			return false;
		},

		delete: function() {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});

			return false;
		},

		toggle_items: function (e) {
			var $unfolded_category = this.$el.find('.unfolded_category');

			$unfolded_category.toggle();
		},

		sort_up: function() {
			var prev_model = this.prev();

			if (prev_model) {
				this.model.set('order', this.model.get('order') - 1);
				prev_model.set('order', prev_model.get('order') + 1);

				this.model.save();
				prev_model.save();

				this.$el.after(this.$el.prev('.category'));
			}

			return false;
		},

		sort_down: function() {
			var next_model = this.next();
			if (next_model) {
				this.model.set('order', this.model.get('order') + 1);
				next_model.set('order', next_model.get('order') - 1);

				this.model.save();
				next_model.save();
				
				this.$el.before(this.$el.next('.category'));
			}

			return false;
		},

		next: function() {
			var id = this.$el.next('.category').attr('data-id');
			return categories_view.collection.get(id);
		},

		prev: function() {
			var id = this.$el.prev('.category').attr('data-id');
			return categories_view.collection.get(id);
		}
	});

	var CategoriesView = Backbone.View.extend({
		el: $('#content'),

		events: {
			'click .icon_add_small': 'add_category'
		},

		initialize: function (json_categories) {
			this.$list = this.$el.find('section');
			this.collection = new Categories(json_categories);
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_category(item);
			}, this);
		},

		render_category: function (item) {
			var category_view = new CategoryView({
				model: item
			});

			this.$list.append(category_view.render().el);
		},

		add_category: function(e) {

			var category = new Category();

			var self = this;

			category.save({}, {
				success: function() {
					self.render_category(category);
					self.collection.add(category);
				}
			});

		}

	});
	
	var categories_view = new CategoriesView(json_categories);

})();