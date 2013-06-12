class RemoveLongitudeFromTiles < ActiveRecord::Migration
  def up
    remove_column :tiles, :latitude
    remove_column :tiles, :longitude
    remove_column :tiles, :type
  end

  def down
    add_column :tiles, :type, :sting
    add_column :tiles, :longitude, :float
    add_column :tiles, :latitude, :float
  end
end
