app.views.CreateStack = Backbone.View.extend({
  tagName: 'div',
  className: 'box',
  id: 'createstack',
  template: JST['templates/createstack'],
  events: {
    'click #testbutton': 'testFunction'
  },

  initialize: function() {
    $('#searchresults').isotope( 'destroy' );
    var _this = this;
    _this.model.stack_list.fetch({
      wait : true, 
      success: function(response){
        
        deleteOverlays();
        var latlng = [];
        
        response.last().attributes.tiles.forEach(function(tile,i) {
          
          var stack = new app.views.StackTileView({ model: tile, id: tile.tileable.tiletype });
          $('#stackresults').append(stack.render().el);
          
          addMarker(tile.tileable.latitude, tile.tileable.longitude, tile.tileable.name,tile.tileable.tiletype);
          var stackLatlng = new google.maps.LatLng(tile.tileable.latitude, tile.tileable.longitude);
          latlng.push(stackLatlng);

        });

        zoomin(latlng);   
        latlng = [];

      }
    });
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }

});