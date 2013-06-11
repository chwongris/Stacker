app.views.StartView = Backbone.View.extend({
  tagName: 'div',
  id: 'start',
  template: JST['templates/start'],
  events: {
    'change #areasearch': 'areaSearch',
    'click #resttilebox': 'favoriteList',
    'click #restaurantfilter': 'restaurantFilter',
    'click #barfilter': 'barFilter',
    'click #concertfilter': 'concertFilter',
    'click #showall' : 'showAll',
    'click #stackbutton' : 'sendCalendar'
  },

  initialize: function() {
   this.listenTo(this.model.RestTileList, 'add', this.update);
 },

 render: function() {
  var html = this.template();
  this.$el.html(html);
  return this;
},

areaSearch: function() {
 var searchterm = $(event.target).val();
   // var geocoder  = new google.maps.Geocoder();
   // geocoder.geocode( { 'address': searchterm }, function(results){

   //  var googleresult = results[0].geometry.location

   // });

var _this = this;

$.ajax({
  url: "/restaurant_tiles",
  type: 'POST',
  data: {searchterm: searchterm},
  success: function (data){

    $('#searchresults').isotope( 'destroy' );
    $('#searchresults').html("");

      // var rest_tile = new app.models.RestTile({ model: data });
      // _this.model.rest_tile_search = new app.collections.RestTileList();
      _this.model.rest_tile_search.reset();
      _this.model.rest_tile_search.add( data );
      // var searchresults = new app.views.RestTileView({ model: rest_tile });
      var latlng = [];

      _this.model.rest_tile_search.models.forEach(function(tile,i) {
        addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'rest');
        var searchresults = new app.views.RestTileView({ model: tile, id: tile.cid });
        _this.$el.find('#searchresults').append(searchresults.render().el).fadeIn(300);
        latlng.push([tile.attributes.latitude, tile.attributes.longitude]);
      });

      // zoomin(latlng);   

      $( ".rest_tile" ).draggable({
                         // clicking an icon won't initiate dragging
      revert: "true", // when not dropped, the item will revert back to its initial position
      revertDuration: 0,
      cursor: "move",
      containment: "document",
      helper: "clone",
      cursor: "move",
      helper: function () {
        // We removeAttr('style') to get rid of the transform css that isotope added.
        return $(this).clone().removeAttr('style').removeClass('isotope-item').addClass('drag-helper').appendTo('body');
      },
      start: function () {
        // $(this).hide();
      },
      stop: function () {
        $(this).show();
      },
      zIndex: 100
    });
    }
  });

$.ajax({
  url: "/event_tiles",
  type: 'POST',
  data: {searchterm: searchterm},
  success: function (data){

      // var event_tile = new app.models.EventTile({ model: data });
      // var searchresults = new app.views.EventTileView({ model: event_tile });
      var latlng = [];
      _this.model.event_tile_search.reset();
      _this.model.event_tile_search.add( data );

      _this.model.event_tile_search.models.forEach(function(tile,i) {
        addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'concert');
        var searchresults = new app.views.EventTileView({ model: tile, id: tile.cid });
        _this.$el.find('#searchresults').append(searchresults.render().el).fadeIn(300);
        latlng.push([tile.attributes.latitude, tile.attributes.longitude]);
      });
      // zoomin(latlng);

      $( ".event_tile" ).draggable({
                         // clicking an icon won't initiate dragging
      revert: "true", // when not dropped, the item will revert back to its initial position
      revertDuration: 0,
      cursor: "move",
      containment: "document",
      helper: "clone",
      cursor: "move",
      helper: function () {
        // We removeAttr('style') to get rid of the transform css that isotope added.
        return $(this).clone().removeAttr('style').removeClass('isotope-item').addClass('drag-helper').appendTo('body');
      },
      start: function () {
        $(this).hide();
      },
      stop: function () {
        $(this).show();
      },
      zIndex: 100
    });
      
      $('#searchresults').isotope({
        layoutMode : 'fitRows'
      });

    }

  });
},

favoriteList: function(e) {
    // alert("test");
    e.preventDefault();
    var id = $(e.currentTarget).data("id");
    var saved = this.model.rest_tile_search.get(id);

    // saved.save();
    this.model.RestTileList.create(saved);
    // this.model.update();

  },

  restaurantFilter: function() {
   $('#searchresults').isotope({ filter: '.rest_tile' });
 },

 barFilter: function() {
   $('#searchresults').isotope({ filter: '.rest_tile' });
 },

 concertFilter: function() {
   $('#searchresults').isotope({ filter: '.event_tile' });
 },

 showAll: function() {
   $('#searchresults').isotope({ filter: '' });
 },

 sendCalendar: function(e) { 
  var _this = this;
  var test = $('#calendar').fullCalendar( 'clientEvents' );
  console.log(test);

  test.forEach(function(calobject){
  switch(calobject.type)
  {
  case "Restaurant":
    var saved = _this.model.rest_tile_search.get(calobject.cid);
    saved.url = '/users/' + current_user.id + '/tiles';
    save();
    console.log(saved);
    break;
  case "Event":
    var saved = _this.model.event_tile_search.get(calobject.cid);
    console.log(saved);
    break;
  }
  // var saved = _this.model.rest_tile_search.get(calobject.cid);
  // _this.model.Stack.create(saved);
});


  
}

});

