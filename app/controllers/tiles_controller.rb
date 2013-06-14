class TilesController < ApplicationController

  def restaurantsearch
    # Geocoder.configure(:lookup => :google)
    # binding.pry
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    
    @restaurants = Restaurant.restaurant_search(latlng[0],latlng[1], "Restaurants")
    @bars = Restaurant.restaurant_search(latlng[0],latlng[1], "Bars")
    @nightlife = Restaurant.restaurant_search(latlng[0],latlng[1], "DanceClubs")
    # @restaurants.first.save
    render :json => @restaurants + @bars + @nightlife
  end

  def eventsearch
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    @events = Event.get_events(latlng[0],latlng[1], params[:searchdate])
    render :json => @events
  end

  def start
  @starttiles = Restaurant.all
  render :json => @starttiles
  end



  def index
    
    @user_tiles = current_user.userTiles
    render :json => @user_tiles
    
  end


  def create

  @tileable = Tile.new(params[:tile])
  @tileable.save
  render :json => @tileable

  end


end
