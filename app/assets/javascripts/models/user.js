app.models.User = Backbone.Model.extend({

 initialize: function() {
  this.tileList = new app.collections.TileList();
  this.tileList.url = '/users/' + this.id + '/tiles';
  this.tileList.on("reset", this.updateCounts);

},

url: function() {
  return '/users/' + this.id;
}

});