class RestaurantsController < ApplicationController

before_filter :load_user

def create

@restaurant = Restaurant.new(params[:restaurant])
@restaurant.save
# binding.pry
@savedlist = RestaurantTile.new(user_id: params[:user_id], restaurant_id: @restaurant.id)

render :json => " "

end

protected
def load_user
  @user = User.find(params[:user_id])
end


end
