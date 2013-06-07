require 'spec_helper'

describe Tile do

  before do
    @latlng = Tile.new.location_search("West Village", "New York")
  end

  it "should return the latlng" do
    @latlng.should eq([40.735781, -74.0035709])
  end

  # describe "the iterative approach" do
  #   before do
  #     pending "TODO... write an iterative method thats faster"
  #     before = Time.now
  #     @numbers = Fibonacci.new.iterative_seq(0, 10)
  #     @iterative = Time.now - before
  #   end

  #   it "should generate the Fibonacci sequence" do
  #     @numbers.should eq([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
  #   end

  #   it "should run faster than a recursive algorithm" do
  #     (@iterative < @recursive).should be_true
  #   end

  # end

end