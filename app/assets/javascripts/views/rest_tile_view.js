app.views.RestTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'rest_tile',
  template: JST['templates/rest_tile'],

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));
    return this;
  }

});