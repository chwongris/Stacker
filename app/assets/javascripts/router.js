app.Router = Backbone.Router.extend({

  routes: {
    '' : 'home'
  },

  home: function () {
    // Try to find projects already in the local storage
    
    var current_user = new app.models.User;
    current_user.url = 'users/me';
    current_user.fetch({
    success: function(user, response, options){

    current_user.id = user.id
    // this.tileList = new app.collections.TileList();
    // this.tileList.url = '/users/' + current_user.id + '/tiles';
    // this.tileList.on("reset", this.updateCounts);
    // this.tileList.fetch({
    // success: function(){
     var start = new app.views.StartView({model: current_user});
     $('#content').html(start.render().el);
     initMap();
   // }
   // });
   }
   });

  }

});

