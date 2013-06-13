app.collections.Stacktiles = Backbone.Collection.extend({

 // url: function() {

 //    var url = '/users/' + window.currentUser.id + '/stacks/' + this.model.id;

 //    return url;

 //  },


  model: app.models.Tileable
  
});