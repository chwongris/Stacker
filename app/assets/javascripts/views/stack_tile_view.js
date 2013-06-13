app.views.StackTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'stacktile',
  template: JST['templates/stacktile'],

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));

    return this;
  }

});