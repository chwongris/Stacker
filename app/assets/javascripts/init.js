$(document).ready(function() {

  var router = new app.Router();
  Backbone.history.start({pushState: true});
  router.navigate('');

});
