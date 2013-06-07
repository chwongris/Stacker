app.views.StartView = Backbone.View.extend({
  tagName: 'div',
  id: 'start',
  template: JST['templates/start'],
  events: {
    'change #areasearch': 'areaSearch'
  },
  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  },

  areaSearch: function() {
   var searchterm = $(event.target).val();
   var _this = this;
   $.ajax({
    url: "/restaurant_tiles",
    type: 'POST',
    data: {searchterm: searchterm},
    success: function (data){

      _this.$el.find('#searchresults').html("");

      var rest_tile = new app.models.RestTile({ model: data });
      var searchresults = new app.views.RestTileView({ model: rest_tile });
      var latlng = [];

      rest_tile.attributes.model.forEach(function(tile,i) {
        addMarker(tile.latitude, tile.longitude, tile.name,'rest');
        var searchresults = new app.views.RestTileView({ model: tile });
        _this.$el.find('#searchresults').append(searchresults.render().el).fadeIn(300);
        latlng.push([tile.latitude, tile.longitude]);
      });
      zoomin(latlng);
    }
    });

    $.ajax({
      url: "/event_tiles",
      type: 'POST',
      data: {searchterm: searchterm},
      success: function (data){

      var event_tile = new app.models.EventTile({ model: data });
      var searchresults = new app.views.EventTileView({ model: event_tile });
      var latlng = [];

      event_tile.attributes.model.forEach(function(tile,i) {
        addMarker(tile.latitude, tile.longitude, tile.name,'concert');
        var searchresults = new app.views.EventTileView({ model: tile });
        _this.$el.find('#searchresults').append(searchresults.render().el).fadeIn(300);
        latlng.push([tile.latitude, tile.longitude]);
      });
      zoomin(latlng);
      }
    });
  }

});

