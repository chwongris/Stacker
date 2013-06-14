app.views.EventTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'event_tile',
  template: JST['templates/event_tile'],

  render: function() {

    var simpledate = $.fullCalendar.parseDate( this.model.attributes.event_datetime );
    var startdate = $.fullCalendar.formatDate(simpledate, "h:mmtt" );

    this.$el.html(this.template({
      model: this.model,
      date: startdate
    }));

      var eventObject = {
        title: this.model.attributes.name, // use the element's text as the event title
        start: this.model.attributes.event_datetime,
        type: this.model.constructor.modelType,
        tiletype: this.model.attributes.tiletype
      };
      
      // store the Event Object in the DOM element so we can get to it later
    this.$el.data('eventObject', eventObject);

    return this;
  }

});