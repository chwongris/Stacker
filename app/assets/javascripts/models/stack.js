app.models.Stack = Backbone.Model.extend({

  urlRoot: function() {

    var url = '/users/' + window.currentUser.id + '/stacks';

    return url;

  }
  
});