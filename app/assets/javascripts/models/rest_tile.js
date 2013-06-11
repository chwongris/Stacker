app.models.RestTile = Backbone.Model.extend({

   url: function() {

    var url = '/users/' + window.currentUser.id + '/restaurants';

    return url;

  }},


{ modelType: "Restaurant" }

);