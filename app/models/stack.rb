class Stack < ActiveRecord::Base
  attr_accessible :name, :stackday

  has_many :timeshells
  has_many :restaurants, :through => :timeshells

end
