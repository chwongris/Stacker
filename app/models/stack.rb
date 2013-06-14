class Stack < ActiveRecord::Base
  attr_accessible :name, :stackday, :user_id

  has_many :tiles

  belongs_to :user


  def as_json(options = {})
    super( { :include => [{  :tiles => { :include => :tileable } },:user] }.merge(options))
  end

 # def as_json(options = {})
 #    super( { :include => {  :tiles => { :include => :tileable } } }.merge(options))
 #  end




  # def as_json(options = {})
  #   super({ :include => :skills, :only => [:id, :title, :body, :url, :user_id] }.merge(options))
  # end

  # (:include => { :posts => { :include => { :comments => {:only => :body } }, :only => :title } })

end
