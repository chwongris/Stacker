app.views.CreateStack = Backbone.View.extend({
  tagName: 'div',
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
        response.last().attributes.tiles.forEach(function(tile,i) {
        // addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'rest');
        var stack = new app.views.StackTileView({ model: tile.tileable });
        $('#searchresults').append(stack.render().el).fadeIn(300);
        // latlng.push([tile.attributes.latitude, tile.attributes.longitude]);
          });
    }}
    );

  // _.last(this.model.stack_list.models).fetch()
 
 },

 render: function() {
  var html = this.template();
  this.$el.html(html);
  return this;
},

testFunction: function() {
  // console.log(this);
  //    this.model.stack_list.last().attributes.tiles.forEach(function(tile,i) {
  //       // addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'rest');
  //       var stack = new app.views.StackTileView({ model: tile.tileable });
  //       $('#searchresults').append(stack.render().el).fadeIn(300);
  //       // latlng.push([tile.attributes.latitude, tile.attributes.longitude]);
  //     });
  // // this.model.stack_list.last().attributes.tiles[0].tileable.name;
  // this.render();
}

});