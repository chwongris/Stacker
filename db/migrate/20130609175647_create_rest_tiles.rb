class CreateRestTiles < ActiveRecord::Migration
  def change
    create_table :rest_tiles do |t|
      t.integer :user_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
