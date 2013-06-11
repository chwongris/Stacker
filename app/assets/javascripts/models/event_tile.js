app.models.EventTile = Backbone.Model.extend({

   url: function() {

    var url = '/users/' + window.currentUser.id + '/events';

    return url;

  }},


{ modelType: "Event" }

);