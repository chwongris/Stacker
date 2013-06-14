app.Router = Backbone.Router.extend({

    routes: {
      '' : 'home',
      '_=_' : 'home',
      'userstacks' : 'userspage',
      'alluserstacks' : 'alluserspage'
    },

    home: function () {
      var a = new app.views.navigationView; //loadview to click

      //load the user and its saved restaurants
      var current_user = new app.models.User;
      current_user.url = 'users/me';
      current_user.fetch({
        success: function(user, response, options){

          current_user.id = user.id
          current_user.RestTileList = new app.collections.RestTileList();
          current_user.RestTileList.url = '/tiles';
          current_user.RestTileList.on("reset", this.updateCounts);

          current_user.rest_tile_search = new app.collections.RestTileList();
          current_user.event_tile_search = new app.collections.EventTileList();

          current_user.rest_tile_totalsearch = new app.collections.RestTileList();
          current_user.event_tile_totalsearch = new app.collections.EventTileList();

          current_user.stack_list = new app.collections.StackList();

          current_user.RestTileList.fetch({
            success: function(){
              var start = new app.views.StartView({ model: current_user });
              $('#content').html(start.render().el);
             
              initMap();
              
              $('.datepicker').datepicker();

              var myDate = new Date();
              var prettyDate =(myDate.getMonth()+1) + '/' + myDate.getDate() + '/' +
              myDate.getFullYear();
              $(".datepicker").val(prettyDate);

              map.panBy(-200, 0);

              startTiles = new app.collections.RestTileList(); //initial tile load
              startTiles.url = '/starttiles';
              startTiles.fetch({
                success: function(data){
                  
                  data.forEach(function(tile){
                    current_user.rest_tile_totalsearch.add(tile);
                  })

                  var _this = this;

                  data.models.forEach(function(tile,i) {
                    addMarker(tile.attributes.latitude, tile.attributes.longitude, tile.attributes.name,tile.attributes.tiletype, tile.attributes.name);
                    var searchresults = new app.views.RestTileView({ model: tile, id: tile.attributes.yelp_url });

                    switch(tile.attributes.tiletype)
                    {
                      case "Restaurants":
                      $('#searchresults').append(searchresults.render().el);
                      var RestaurantLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
                      latlng.push(RestaurantLatlng);
                      restlatlng.push(RestaurantLatlng);
                      break;

                      case "Bars":
                      $('#searchresults').append(searchresults.render().$el.removeClass("rest_tile").addClass("bar_tile"));
                      var BarLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
                      latlng.push(BarLatlng);
                      barlatlng.push(BarLatlng);
                      break;

                      case "DanceClubs":
                      $('#searchresults').append(searchresults.render().$el.removeClass("rest_tile").addClass("dance_tile"));
                      var DanceLatlng = new google.maps.LatLng(tile.attributes.latitude, tile.attributes.longitude);
                      latlng.push(DanceLatlng);
                      dancelatlng.push(DanceLatlng);
                      break;
                    }
                  });
                  
                $('#searchresults').isotope({
                    layoutMode : 'fitRows'
                  });
   
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

            $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaDay, agendaWeek',
                ignoreTimezone: false
              },
              defaultView: 'agendaDay',
              firstDay: 5,
              firstHour: 18,
              selectable: true,
              selectHelper: true,
              editable: true,
              droppable: true,
              height: 440,
              drop: function(date, allDay) {
                // alert("Dropped on " + date + " with allDay=" + allDay);
                // var dropped = current_user.rest_tile_search.findWhere(this.id);

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);
                
                // assign it the date that was reported
                if (copiedEventObject.start == undefined ){
                  copiedEventObject.start = date;
                  copiedEventObject.end = (date.getTime() + 1800000*4)/1000;
                }else{
                  copiedEventObject.start = copiedEventObject.start + "Z";
                  var time = $.fullCalendar.parseDate( copiedEventObject.start );
                  copiedEventObject.start = time;
                  copiedEventObject.end = (time.getTime() + 1800000*4)/1000;
                }
                
                copiedEventObject.allDay = allDay;
                copiedEventObject.cid = this.id;

                switch (copiedEventObject.tiletype)
                  {
                  case "Restaurants":
                    copiedEventObject.color = "#CF5979";
                    break;
                    case "Bars":
                    copiedEventObject.color = "#86CA57";
                    break;
                    case "DanceClubs":
                    copiedEventObject.color = "#95b7b5";
                    break;
                    case "Concerts":
                    copiedEventObject.color = "#486897";
                    break;
                  }

                
                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                 
              }
            });
          }
        });
      }
    });    
  },

  userspage: function() {
    var a = new app.views.navigationView; 

   $('#content').html("").append("<div id='stackscrollbox'><div id='stackscroll'></div></div>");

   var current_user = new app.models.User;
   current_user.stack_list = new app.collections.StackList;
   current_user.url = 'users/me';
   current_user.fetch({
      success: function(user, response, options){

      current_user.stack_list.fetch({
        success: function(user, response, options){

          response.forEach(function(stack,i) {
            var stackindex = new app.views.StackIndex({model: stack}).render()
            $('#stackscroll').append(stackindex.el);
          });

            $('#stackscroll').isotope({});
            $('#stackscroll').isotope( 'shuffle');


        }
      })
    }
    });
  },

  alluserspage: function() {
    var a = new app.views.navigationView; 
   $('#content').html("").append("<div id='stackscrollbox'><div id='stackscroll'></div></div>");
    
    all_stack_list = new app.collections.StackList;
    all_stack_list.url = 'allstacks';

      all_stack_list.fetch({
        success: function(user, response, options){

          response.forEach(function(stack,i) {
            var stackindex = new app.views.StackIndex({model: stack}).render()
            $('#stackscroll').append(stackindex.el);
          });

          $('#stackscroll').isotope({});
           $('#stackscroll').isotope( 'shuffle');
        }
      });
    
    }



});

