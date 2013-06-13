  var restlatlng = [];
  var barlatlng = [];
  var dancelatlng = [];
  var concertlatlng = [];

  app.views.StartView = Backbone.View.extend({
    tagName: 'div',
    id: 'start',
    template: JST['templates/start'],
    events: {
      'change #areasearch': 'areaSearch',
      'change #datepicker': 'datePicker',
      'click #resttilebox': 'favoriteList',
      'click #restaurantfilter': 'restaurantFilter',
      'click #barfilter': 'barFilter',
      'click #dancefilter': 'danceFilter',
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

  datePicker: function() {
    var searchdate = $('.datepicker').val();
    var gotodate = new Date(searchdate);
    $('#calendar').fullCalendar( 'gotoDate', gotodate );

  },

  areaSearch: function() {
  deleteOverlays();
  restlatlng = [];
  barlatlng = [];
  dancelatlng = [];
  concertlatlng = [];
  latlng = [];
   var searchterm = $(event.target).val();
   var searchdate = $('.datepicker').val();
   var _this = this;

   $('.waiting').toggle();
   $('#searchresults').html("");
   $('#searchresults').isotope( 'destroy' );




   $.ajax({
    url: "/restaurant_tiles",
    type: 'POST',
    data: {searchterm: searchterm},
    success: function (data){

      _this.model.rest_tile_search.reset();
      _this.model.rest_tile_search.add( data );
      _this.model.rest_tile_totalsearch.add( data );

      var latlng = [];


      _this.model.rest_tile_search.models.forEach(function(tile,i) {
        addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,tile.attributes.tiletype, tile.attributes.name);
        var searchresults = new app.views.RestTileView({ model: tile, id: tile.attributes.yelp_url });

        switch(tile.attributes.tiletype)
        {
          case "Restaurants":
          _this.$el.find('#searchresults').append(searchresults.render().el);
          var RestaurantLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
          latlng.push(RestaurantLatlng);
          restlatlng.push(RestaurantLatlng);
          break;

          case "Bars":
          _this.$el.find('#searchresults').append(searchresults.render().$el.removeClass("rest_tile").addClass("bar_tile"));
          var BarLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
          latlng.push(BarLatlng);
          barlatlng.push(BarLatlng);
          break;

          case "DanceClubs":
          _this.$el.find('#searchresults').append(searchresults.render().$el.removeClass("rest_tile").addClass("dance_tile"));
          var DanceLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
          latlng.push(DanceLatlng);
          dancelatlng.push(DanceLatlng);
          break;
        }

      });

  zoomin(latlng);   
  latlng = [];

  $( ".rest_tile, .bar_tile, .dance_tile").draggable({
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
    data: {searchterm: searchterm, searchdate: searchdate},
    success: function (data){

      var latlng = [];
      _this.model.event_tile_search.reset();
      _this.model.event_tile_search.add( data );
      _this.model.event_tile_totalsearch.add( data );

      _this.model.event_tile_search.models.forEach(function(tile,i) {
        addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'concert', tile.attributes.name);
        var searchresults = new app.views.EventTileView({ model: tile, id: tile.attributes.event_url });
        _this.$el.find('#searchresults').append(searchresults.render().el);
        var ConcertLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
        latlng.push(ConcertLatlng);
        concertlatlng.push(ConcertLatlng);
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

        },
        stop: function () {
          $(this).show();
        },
        zIndex: 100
      });
        
        $('#searchresults').isotope({
          layoutMode : 'fitRows'
        });

        var gotodate = new Date(searchdate)
      // $('.waiting').toggle();
      // stroll.bind( "#searchresults" );
      $('#calendar').fullCalendar( 'gotoDate', gotodate )
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
     zoomin(restlatlng);  
   },

   barFilter: function() {
     $('#searchresults').isotope({ filter: '.bar_tile' });
     zoomin(barlatlng); 
   },

   danceFilter: function() {
     $('#searchresults').isotope({ filter: '.dance_tile' });
     zoomin(dancelatlng); 
   },

   concertFilter: function() {
     $('#searchresults').isotope({ filter: '.event_tile' });
     zoomin(concertlatlng); 
   },

   showAll: function() {
     $('#searchresults').isotope({ filter: '' });
     zoomin(latlng); 
   },

   sendCalendar: function(e) { 
    var _this = this;
    var test = $('#calendar').fullCalendar( 'clientEvents' );
    console.log(test);
    var ajaxcount = test.length;

    var newstack = new app.models.Stack;
    newstack.attributes.name = $('#stackname').val();
    newstack.attributes.stackday = new Date();
    newstack.newstacktiles = new app.collections.Stacktiles();

    _this.model.stack_list.create(newstack,{
        wait : true,    // waits for server to respond with 200 before adding newly created model to collection
        success : function(resp){

          var stackcallback = resp;

          test.forEach(function(calobject){
            switch(calobject.type)
            {
              case "Restaurant":
              var saved = _this.model.rest_tile_totalsearch.findWhere({yelp_url: calobject.cid});
              saved.save(null,{
                success: function(response){
                // console.log(model);
                // console.log(response);

                var resttileable = new app.models.Tileable;
                resttileable.attributes.name = calobject.title;
                resttileable.attributes.tileable_id = response.id;
                resttileable.attributes.tileable_type = calobject.type;
                resttileable.attributes.end = calobject.end;
                resttileable.attributes.start = calobject.start;
                resttileable.attributes.allDay = calobject.allDay;
                resttileable.attributes.stack_id = stackcallback.id;
                _.last(_this.model.stack_list.models).newstacktiles.create(resttileable,{
                  wait : true, 
                  success : function() {
                    --ajaxcount;
                    if(ajaxcount == 0){ 
                      var createstack = new app.views.CreateStack({model: _this.model }).render();
                      $('#searchresults').html("");
                      $('#searchresults').html(createstack.el);
                    }
                  }
                });
                // _this.model.stack_list.newstack.newstacktiles.create(resttileable);
                // resttileable.save();
                

              }
            });
  break;

  case "Event":
  var saved = _this.model.event_tile_totalsearch.findWhere({event_url: calobject.cid});
  saved.save(null,{
    success: function(response){
      var eventtileable = new app.models.Tileable;
      eventtileable.attributes.name = calobject.title;
      eventtileable.attributes.tileable_id = response.id;
      eventtileable.attributes.tileable_type = calobject.type;
      eventtileable.attributes.end = calobject.end;
      eventtileable.attributes.start = calobject.start;
      eventtileable.attributes.allDay = calobject.allDay;
      eventtileable.attributes.stack_id = stackcallback.id;

      _.last(_this.model.stack_list.models).newstacktiles.create(eventtileable,{
        wait : true, 
        success : function() {
          --ajaxcount;
          if(ajaxcount == 0){ 
            var createstack = new app.views.CreateStack({model: _this.model }).render();
            $('#searchresults').html("");
            $('#searchresults').html(createstack.el);
          }
        }
      });



    }
  });
  break;
}
});




}

});
}


});


