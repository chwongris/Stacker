class UsersController < ApplicationController

before_filter :authenticate_user!

def index
# binding.pry
@backbone = true
end

def show
  render :index
end

def me
    render :json => current_user
end

end
