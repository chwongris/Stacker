app.views.StackTileView = Backbone.View.extend({

  tagName: 'div',
  className: 'stacktile',
  template: JST['templates/stacktile'],

  render: function() {

    var startDateObject = new Date( this.model.start );
    var startDate = $.fullCalendar.formatDate(startDateObject, "h:mmtt" );

    var endDateObject = new Date( this.model.end );
    var endDate = $.fullCalendar.formatDate(endDateObject, "h:mmtt" );

    this.$el.html(this.template({
      model: this.model,
      startdate: startDate,
      enddate: endDate
    }));
    return this;
  }

});