class UsersController < ApplicationController

before_filter :authenticate_user!

def index
  # binding.pry
  if current_user.avatar.url == nil
  else
  current_user.image_url = current_user.avatar.url(:large_thumb)
  current_user.image_url_small = current_user.avatar.url(:small_thumb)
  current_user.save
  end
  @backbone = true
  render :index
end

def show
  render :index
end

def me

  result = request.location
  ipcity = result.data["city"]

  if ipcity == ""
  current_user.current_city = "New York"
  else
  current_user.current_city = ipcity
  end

  render :json => current_user 

end

end
