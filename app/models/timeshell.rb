class Timeshell < ActiveRecord::Base
  attr_accessible :allDay, :end, :start, :title, :restaurant_id, :stack_id

  belongs_to :restaurant
  belongs_to :stack
  
end
