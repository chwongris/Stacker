class UserTile < ActiveRecord::Base
  attr_accessible :tile_id, :user_id

  belongs_to :user
  belongs_to :tile
end
