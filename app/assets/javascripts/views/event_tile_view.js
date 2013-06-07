app.views.EventTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'event_tile',
  template: JST['templates/event_tile'],

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));
    return this;
  }

});