class AddTiletypeToEvents < ActiveRecord::Migration
  def change
    add_column :events, :tiletype, :string
  end
end
