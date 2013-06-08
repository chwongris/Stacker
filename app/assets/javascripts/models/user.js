app.models.User = Backbone.Model.extend({

 initialize: function() {

},

url: function() {
  return '/users/' + this.id;
}

});