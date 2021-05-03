class AddNameToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :role, :integer, default: 0
    add_index :users, :name, unique: true
  end
end
