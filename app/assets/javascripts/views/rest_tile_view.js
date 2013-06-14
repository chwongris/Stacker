app.views.RestTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'rest_tile',
  template: JST['templates/rest_tile'],

  render: function() {
    this.$el.html(this.template({
      model: this.model
    }));

    var eventObject = {
        title: this.model.attributes.name, // use the element's text as the event title
        tiletype: this.model.attributes.tiletype,
        type: this.model.constructor.modelType
      };
      
      // store the Event Object in the DOM element so we can get to it later
    this.$el.data('eventObject', eventObject);
    return this;
  }

});