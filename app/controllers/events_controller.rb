class EventsController < ApplicationController


def create
@event = Event.new(params[:event])
@event.save

render :json => @event

end

def update
@event = Event.find(params[:id])
@event.update_attributes(params[:event])
render :json => @event
end


end
