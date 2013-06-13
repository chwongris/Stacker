class Tile < ActiveRecord::Base
  belongs_to :tileable, :polymorphic => true

  # has_many :stacktiles
  belongs_to :stack

  attr_accessible :name, :tileable_id, :tileable_type, :allDay, :end, :start, :title, :stack_id






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
