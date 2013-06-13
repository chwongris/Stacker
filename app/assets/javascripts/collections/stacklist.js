app.collections.StackList = Backbone.Collection.extend({

  comparator: function(stack) {
  return stack.get("id");
  },


  url: function() {

    var url = '/users/' + window.currentUser.id + '/stacks';

    return url;

  },

  model: app.models.Stack
  
});