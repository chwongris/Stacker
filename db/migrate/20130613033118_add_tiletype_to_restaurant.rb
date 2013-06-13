class AddTiletypeToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :tiletype, :string
  end
end
