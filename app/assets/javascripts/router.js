app.Router = Backbone.Router.extend({

  routes: {
    '' : 'home'
  },

  home: function () {
    // Try to find projects already in the local storage
    
    var current_user = new app.models.User;
    current_user.url = 'users/me';
    current_user.fetch();

    var start = new app.views.StartView();
    $('#content').html(start.render().el);
    initMap();
  }

});