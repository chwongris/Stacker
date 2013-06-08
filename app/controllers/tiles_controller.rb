class TilesController < ApplicationController

  def restaurantsearch
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    @restaurants = Restaurant.restaurant_search(latlng[0],latlng[1])
    render :json => @restaurants
  end

  def eventsearch
    result = request.location
    ipcity = result.data["city"]
    latlng = Tile.new.location_search(params[:searchterm], ipcity)
    @events = Event.get_events(latlng[0],latlng[1], "2013-06-15")
    render :json => @events
  end

  def index

    # @user_tiles = 


    # @render :json => @user_tiles
  end

end
