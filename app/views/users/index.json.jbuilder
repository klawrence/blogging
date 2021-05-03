json.users do
  json.partial! 'users/user', collection: @users, as: :user
end
