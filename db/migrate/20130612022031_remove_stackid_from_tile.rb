class RemoveStackidFromTile < ActiveRecord::Migration
  def up
    remove_column :tiles, :stack_id
  end

  def down
    add_column :tiles, :stack_id, :integer
  end
end
