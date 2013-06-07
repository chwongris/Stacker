class Tile < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :name


  geocoded_by :my_cool_geocoding_method

  def self.my_cool_geocoding_method(search)
    "#{search}"
  end

  def location_search(searchterm, ipcity)



    latlng = []

    if ipcity == ""
      latlng = Geocoder.coordinates("#{searchterm}, New York")
    else
      latlng = Geocoder.coordinates("#{searchterm}, #{ipcity}")
    end
    
    return latlng
    # latitude = latlng[0]
    # longitude = latlng[1]
  end



end
