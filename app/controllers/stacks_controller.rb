class StacksController < ApplicationController

def index

  @stacks = Stack.where(user_id:params[:user_id])
  render :json => @stacks

end


def create

  @stack = Stack.new(name:params[:stack][:name], stackday:params[:stack][:stackday], user_id:params[:user_id])
  @stack.save
  render :json => @stack

end

def show

  @stack = Stack.find(params[:id])
  render :json => @stack

end

def allindex
  
  @stacks = Stack.all
  render :json => @stacks

end




end
