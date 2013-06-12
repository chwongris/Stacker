class Stack < ActiveRecord::Base
  attr_accessible :name, :stackday, :user_id

  has_many :stacktiles
  has_many :tiles, :through => :stacktiles

  belongs_to :user
end
