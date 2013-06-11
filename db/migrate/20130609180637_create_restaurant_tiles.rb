class CreateRestaurantTiles < ActiveRecord::Migration
  def change
    create_table :restaurant_tiles do |t|
      t.integer :user_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
