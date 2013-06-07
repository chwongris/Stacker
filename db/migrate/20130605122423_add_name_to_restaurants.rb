class AddNameToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :latitude, :float
    add_column :restaurants, :longitude, :float
    add_column :restaurants, :city, :string
    add_column :restaurants, :state, :string
    add_column :restaurants, :yelp_id, :integer
    add_column :restaurants, :yelp_stars_url, :string
    add_column :restaurants, :name, :string
    add_column :restaurants, :address, :string
    add_column :restaurants, :zipcode, :string
    add_column :restaurants, :image_url, :string
    add_column :restaurants, :yelp_rating, :float
    add_column :restaurants, :category, :string
    add_column :restaurants, :yelp_url, :string
  end
end
