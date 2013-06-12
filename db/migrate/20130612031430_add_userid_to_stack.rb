class AddUseridToStack < ActiveRecord::Migration
  def change
    add_column :stacks, :user_id, :integer
  end
end
