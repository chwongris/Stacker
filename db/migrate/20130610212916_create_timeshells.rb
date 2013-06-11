class CreateTimeshells < ActiveRecord::Migration
  def change
    create_table :timeshells do |t|
      t.datetime :start
      t.datetime :end
      t.boolean :allDay
      t.string :title

      t.timestamps
    end
  end
end
