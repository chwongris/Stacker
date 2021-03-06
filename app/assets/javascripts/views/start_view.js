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
    'click #stackbutton' : 'sendCalendar',
    'click .rest_tile, .bar_tile, .dance_tile, .event_tile ' : 'popup'
  },

  initialize: function() {
   this.listenTo(this.model.RestTileList, 'add', this.update);
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  },

  popup: function(){

  var data = $(event.target).parent().parent()[0].id
  var view = new app.views.modalView( {id:data} );
  view.render();
  $('#modalpop').html(view.el);

  var $modalEl = $("#modal-simple");
  $modalEl.modal();

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

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': searchterm }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
    }
    });

    //geocode by ip on the controller, put in field and then merge into clients side geocoder

      // map.setCenter(results[0].geometry.location);
    //   var marker = new google.maps.Marker({
    //   map: map,
    //   position: results[0].geometry.location
    // });

    $('#searchresults').html("");
    $('#searchresults').isotope( 'destroy' );
    $('.waiting').show();
    $('#buttons').toggle();

    $.ajax({
      url: "/restaurant_tiles",
      type: 'POST',
      data: {searchterm: searchterm},
      success: function (data){
        
        $('.waiting').hide();
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
          addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,'Concerts', tile.attributes.name);
          var searchresults = new app.views.EventTileView({ model: tile, id: tile.attributes.event_url });
          _this.$el.find('#searchresults').append(searchresults.render().el);
          var ConcertLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
          latlng.push(ConcertLatlng);
          concertlatlng.push(ConcertLatlng);
        });

        $( ".event_tile" ).draggable({
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
      
          $('#searchresults').isotope( 'shuffle');

          var gotodate = new Date(searchdate);
  
          $('#calendar').fullCalendar( 'gotoDate', gotodate );
          $('#buttons').toggle();
        }
      });
  },

  favoriteList: function(e) {

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
    $('#searchresults').isotope( 'shuffle');
    zoomin(latlng); 
  },

  sendCalendar: function(e) { 
    var _this = this;
    var test = $('#calendar').fullCalendar( 'clientEvents' ); 
    $('#calendar').fullCalendar( 'removeEvents' );  
    var ajaxcount = test.length;

    var newstack = new app.models.Stack;
    newstack.attributes.name = $('#stackname').val();
    newstack.attributes.stackday = new Date($('#datepicker').val());
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


