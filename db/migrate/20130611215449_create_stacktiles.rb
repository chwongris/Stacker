class CreateStacktiles < ActiveRecord::Migration
  def change
    create_table :stacktiles do |t|
      t.integer :tile_id
      t.integer :stack_id

      t.timestamps
    end
  end
end
