class AddTileableToTiles < ActiveRecord::Migration
  def change
    add_column :tiles, :tileable_id, :integer
    add_column :tiles, :tileable_type, :string
  end
end
