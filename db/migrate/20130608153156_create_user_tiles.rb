class CreateUserTiles < ActiveRecord::Migration
  def change
    create_table :user_tiles do |t|
      t.integer :user_id
      t.integer :tile_id

      t.timestamps
    end
  end
end
