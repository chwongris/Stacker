app.views.StackIndex = Backbone.View.extend({
  tagName: 'div',
  className: 'box',
  id: 'createstackpin',
  template: JST['templates/stackindex'],

  initialize: function() {

 },

 render: function() {
    var date = new Date(this.model.stackday);
        date = date.toDateString();

   this.$el.html(this.template({date:date}));

     var _this = this;
     _this.model.tiles.forEach(function(tile) {
       
        var stack = new app.views.StackTileView({ model: tile, id: tile.tileable.tiletype });
        console.log(stack);
      _this.$el.find("#stackresults").append(stack.render().el);
      });

  return this;
}

});