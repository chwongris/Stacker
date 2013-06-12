app.Router = Backbone.Router.extend({

  routes: {
    '' : 'home'
  },

  home: function () {
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

        current_user.stack_list = new app.collections.StackList();


        current_user.RestTileList.fetch({
          success: function(){
           var start = new app.views.StartView({ model: current_user });
           $('#content').html(start.render().el);
           initMap();
           $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: '',
                ignoreTimezone: false
              },
              defaultView: 'agendaDay',
              firstHour: 18,
              allDaySlot: false,
              selectable: true,
              selectHelper: true,
              editable: true,
              droppable: true,
              height: 500,
              drop: function(date, allDay) {
                // alert("Dropped on " + date + " with allDay=" + allDay);
                var dropped = current_user.rest_tile_search.get(this.id);

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

  
});
   
