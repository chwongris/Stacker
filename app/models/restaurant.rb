class Restaurant < ActiveRecord::Base
  attr_accessible :latitude,
  :longitude,
  :city,
  :state,
  :yelp_id,
  :yelp_stars_url,
  :name,
  :address,
  :zip_code,
  :image_url,
  :yelp_rating,
  # :foursquare_rating,
  # :foursquare_review,
  :category,
  :yelp_url

  has_many :restaurantTiles
  has_many :users, :through => :restaurantTiles

  has_many :timeshells
  has_many :stacks, :through => :timeshells

  

def self.restaurant_search(latitude, longitude)
    @yelpdata = Yelp::Client.new
    request = Yelp::V2::Search::Request::GeoPoint.new(:term => "restaurants", :latitude => latitude, :longitude => longitude, :consumer_key => 'mvNDV5Z5OYwaPTR_KcZsQw', 
      :consumer_secret => 'N-czzlOPx5XsuPB1H0wPtmAKQjM', 
      :token => '2X-gnp-3qyIpont9bInLr3sakMzeJOHC', 
      :token_secret => 'xQ0mDjscdT00a3ZxDrHgnlaTDRg')
    results = @yelpdata.search(request)

    @outdoorresults = []
      results["businesses"].each do |rest|
        # binding.pry
        restaurant = Restaurant.new

        restaurant.name = rest["name"] 
        restaurant.yelp_id = rest["id"] 
        restaurant.city = rest["location"]["city"]
        restaurant.yelp_rating = rest["rating"] 
        restaurant.address = rest["location"]["address"][0]
        restaurant.latitude = rest["location"]["coordinate"]["latitude"]
        restaurant.longitude = rest["location"]["coordinate"]["longitude"]
        restaurant.yelp_stars_url = rest["rating_img_url"]
        restaurant.category = rest["categories"][0][0]
        restaurant.yelp_url = rest["url"] 
        restaurant.image_url = rest["image_url"]
        @outdoorresults << restaurant

      end

      return @outdoorresults
      # binding.pry
          # yelpdata = []
        # yelpdata << yelp_venue(restaurant.yelp_id.to_s)
        # restaurant.yelp_rating = yelpdata.first["rating"]
        # restaurant.yelp_stars_url = yelpdata.first["rating_img_url"]
        # restaurant.yelpreview = yelpdata.first["reviews"].first["excerpt"]
end


  # def self.foursquare_search(search_name)
  #   data = Foursquare2::Client.new(:client_id => 'ZWHNRSWGXP11SVWOP2LPEWVC3POJJPPWAQ5IZ1AFSWDNAOM5', :client_secret => 'HVM4I1NYSANJHGNILUQKAX43KAFN0MOQK3ZP3GX1CWGEPFCQ')
  #   searchresults = data.search_venues(:near => 'New York', categoryId: "4d4b7105d754a06374d81259", :query => search_name, :limit => "5")
    
  #   list = []

  #   searchresults["groups"].first["items"].take(5).each do |rest| 

  #     restaurant = Restaurant.new
  #     restaurant.name = rest["name"]
  #     restaurant.address = rest["location"]["address"]
  #     # restaurant.foursquare_identifier = rest["id"]
  #     restaurant.latitude = rest["location"]["lat"]
  #     restaurant.longitude = rest["location"]["lng"]
  #     restaurant.city = rest["location"]["city"]
  #     restaurant.state = rest["location"]["state"]
  #     foursquare_data = []
  #     foursquare_data << foursquare_venue(restaurant.foursquare_identifier)
  #     restaurant.foursquare_rating = foursquare_data.first["rating"]

  #     unless foursquare_data.first["photos"]["count"] <= 5
  #       restaurant.image_url = foursquare_data.first["photos"]["groups"][1]["items"][1]["url"]
  #     end

  #     results = yelp_search(restaurant.name, restaurant.latitude, restaurant.longitude, restaurant.city)

      # if results["businesses"].first == nil
      # else
        # restaurant.yelp_id = results["businesses"].first["id"] 
        # yelpdata = []
        # yelpdata << yelp_venue(restaurant.yelp_id.to_s)
        # restaurant.yelp_rating = yelpdata.first["rating"]
        # restaurant.yelp_stars_url = yelpdata.first["rating_img_url"]
        # restaurant.yelpreview = yelpdata.first["reviews"].first["excerpt"]
      # end
      # restaurant.save
    #   list << restaurant
    # end

    # unless list.empty? 
    #   list
    # else
    #   list[0]="No Results"
    # end

  # end

  # def self.foursquare_venue(foursquare_identifier)
  #   data = Foursquare2::Client.new(:client_id => 'ZWHNRSWGXP11SVWOP2LPEWVC3POJJPPWAQ5IZ1AFSWDNAOM5', :client_secret => 'HVM4I1NYSANJHGNILUQKAX43KAFN0MOQK3ZP3GX1CWGEPFCQ')
  #   venuedata = data.venue(foursquare_identifier)
  # end

 

  # def self.yelp_venue(yelp_identifier)
  #   # data = Yelp::Client.new
  #   request = Yelp::V2::Business::Request::Id.new(
  #     :yelp_business_id => yelp_identifier, :consumer_key => 'mvNDV5Z5OYwaPTR_KcZsQw', 
  #     :consumer_secret => 'N-czzlOPx5XsuPB1H0wPtmAKQjM', 
  #     :token => '2X-gnp-3qyIpont9bInLr3sakMzeJOHC', 
  #     :token_secret => 'xQ0mDjscdT00a3ZxDrHgnlaTDRg')
  #   @yelpdata.search(request)
  # end

end
