class Tile < ActiveRecord::Base
  belongs_to :tileable, :polymorphic => true

  belongs_to :stack

  has_many :userTiles
  has_many :users, :through => :userTiles

  attr_accessible :name, :tileable_id, :tileable_type, :allDay, :end, :start, :title, :stack_id


  def location_search(searchterm, ipcity)

    latlng = []

    if ipcity == ""
      latlng = Geocoder.coordinates("#{searchterm}, New York")
    else
      latlng = Geocoder.coordinates("#{searchterm}, #{ipcity}")
    end
    
    return latlng

  end

end
