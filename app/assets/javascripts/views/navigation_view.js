app.views.navigationView = Backbone.View.extend({
 
  el: 'div.navbar',
  events: {
     'click #showStacks': 'showStacks',
     'click #createStack': 'createStack',
     'click #showUsers' : 'clicktest'
  },

  showStacks: function() {
     // app.navigate('userstacks');
new app.Router().navigate("userstacks", {trigger: true});
 
    // event.preventDefault();
    // var id = $(event.target).data("id");
    // new app.Router().navigate('/users/' + id, {trigger: true});
  },

  createStack: function(){
new app.Router().navigate(" ", {trigger: true});

  }

});