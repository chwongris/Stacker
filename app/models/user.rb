class User < ActiveRecord::Base
  

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, 
                  :password, 
                  :password_confirmation, 
                  :remember_me, 
                  :first_name,
                  :last_name,
                  :name, 
                  :provider, 
                  :uid, 
                  :access_token, 
                  :image_url,
                  :image_url_small,
                  :avatar

  mount_uploader :avatar, AvatarUploader


  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
  user = User.where(:provider => auth.provider, :uid => auth.uid).first
  

    unless user
      user = User.create(first_name:auth.extra.raw_info.first_name,
                         last_name:auth.extra.raw_info.last_name,
                         provider:auth.provider,
                         uid:auth.uid,
                         email:auth.info.email,
                         password:Devise.friendly_token[0,20],
                         access_token:auth['credentials']['token']
                         )
    end

  user.update_attributes(access_token:auth['credentials']['token'])
  user.update_attributes(image_url:user.facebook_profile_large)
  user.update_attributes(image_url_small:user.facebook_profile_small)
  user
  # binding.pry
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def graph
    @graph ||= Koala::Facebook::API.new(access_token)
  end

  def facebook_info
    profile = graph.get_object("me")
  end

  def facebook_friends
    friends = graph.get_connections("me", "friends")
  end

  def facebook_profile_large
    picture = graph.get_picture("me", :type => "large")
  end

  def facebook_profile_small
    picture = graph.get_picture("me", :type => "small")
  end

end
