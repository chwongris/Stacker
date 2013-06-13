class Event < ActiveRecord::Base
  attr_accessible :average_price, 
                  :event_datetime, 
                  :event_url, 
                  :lowest_price, 
                  :name, 
                  :performers, 
                  :performers_url, 
                  :seatgeek_score, 
                  :seatgeekevent_id, 
                  :venue_address, 
                  :venue_cityzip, 
                  :venue_name,
                  :latitude,
                  :longtitude,
                  :tiletype

  has_many :tiles, :as => :tileable

  def seatgeek
    @seatgeek ||= SeatGeek::Connection.new
  end

  def self.get_events(latitude, longitude, date)
    events = []

      @seatgeek ||= SeatGeek::Connection.new
      results = @seatgeek.events(lat:latitude, lon:longitude, range:"8mi", sort:"score.desc", per_page: 100, datetime_utc: date)
      results["events"].each do |result|

        unless Event.where('event_url = ?', result["url"]).empty?
        event = Event.where('event_url = ?', result["url"]).first
        else
        event = Event.new
        event.name = result["title"]
        event.average_price = result["stats"]["average_price"]
        event.lowest_price = result["stats"]["lowerst_price"]
        event.event_datetime = result["datetime_local"]
        event.event_url = result["url"]
        event.performers = result["performers"]
        event.seatgeek_score = result["score"]
        event.seatgeekevent_id = result["id"]
        event.venue_address = result["venue"]["address"]
        event.venue_name = result["venue"]["name"]
        event.venue_cityzip = result["venue"]["extended_address"]
        event.latitude = result["venue"]["location"]["lat"]
        event.longitude = result["venue"]["location"]["lon"]
        event.tiletype = "Concerts"
      
        if result["performers"].first["image"] == nil
            event.image_url = "http://images.elephantjournal.com/wp-content/uploads/2013/04/hands_in_the_air__in_concert_cc-100x100.jpg"
        else
              event.image_url = result["performers"].first["image"]
        end

        end
        events << event
      end
      

    return events
  end

   # def self.get_event_ondate(latitude, longitude, date)
    
   #  results = seatgeek.get_event(lat:latitude, lon:longitude, range:"10mi", sort:"score.desc")
    
   #  results.each do |result|
    

   #  end
    
  # end

end
