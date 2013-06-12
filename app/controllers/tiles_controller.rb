class TilesController < ApplicationController

  def restaurantsearch
    # Geocoder.configure(:lookup => :google)
    # binding.pry
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    
    @restaurants = Restaurant.restaurant_search(latlng[0],latlng[1])
    # @restaurants.first.save
    render :json => @restaurants
  end

  def eventsearch
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    @events = Event.get_events(latlng[0],latlng[1], "2013-06-13")
    render :json => @events
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
