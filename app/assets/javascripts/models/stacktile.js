app.models.Stacktile = Backbone.Model.extend({

   url: function() {

    var url = '/users/' + window.currentUser.id + '/stacks';

    return url;

  }
});