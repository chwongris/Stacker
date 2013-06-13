class AddStackIdToTile < ActiveRecord::Migration
  def change
    add_column :tiles, :stack_id, :integer
  end
end
