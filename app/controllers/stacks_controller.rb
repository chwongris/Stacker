class StacksController < ApplicationController

def create

@stack = Stack.new(name:params[:stack][:name], stackday:params[:stack][:stackday], user_id:params[:user_id])

# binding.pry
@stack.save

render :json => @stack

end



end
