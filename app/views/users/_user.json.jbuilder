if admin?
  json.extract! user, :id, :name, :email, :role, :created_at, :updated_at
else
  json.extract! user, :id, :name
end
