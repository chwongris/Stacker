class Stacktile < ActiveRecord::Base
  attr_accessible :stack_id, :tile_id

  belongs_to :stack
  belongs_to :tile
end
