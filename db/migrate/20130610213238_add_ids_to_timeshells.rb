class AddIdsToTimeshells < ActiveRecord::Migration
  def change
    add_column :timeshells, :restaurant_id, :integer
    add_column :timeshells, :stack_id, :integer
  end
end
