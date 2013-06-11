class AddTypeToTiles < ActiveRecord::Migration
  def change
    add_column :tiles, :type, :string
  end
end
