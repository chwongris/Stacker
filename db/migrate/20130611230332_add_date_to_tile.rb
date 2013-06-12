class AddDateToTile < ActiveRecord::Migration
  def change
    add_column :tiles, :end, :datetime
    add_column :tiles, :start, :datetime
    add_column :tiles, :allDay, :boolean
    add_column :tiles, :title, :string
  end
end
