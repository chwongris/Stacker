class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :event_url
      t.float :seatgeek_score
      t.float :average_price
      t.string :event_datetime
      t.text :performers
      t.string :performers_url
      t.string :venue_name
      t.string :venue_address
      t.integer :seatgeekevent_id
      t.float :lowest_price
      t.string :venue_cityzip

      t.timestamps
    end
  end
end
