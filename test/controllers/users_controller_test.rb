require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = create_admin
    @sally = create_user 'sally'
  end

  test 'the user index is admin only' do
    assert_raises Errors::AccessError do
      sign_in @sally
      get users_url
    end
  end

  test 'the index page returns the react application' do
    sign_in @admin
    get users_url
    assert_select '#react'
  end

  test 'get a list of users in JSON' do
    sign_in @admin
    get users_url(format: :json)
    json = json_response

    assert_equal 2, json[:users].count
    assert_equal 'admin', json[:users][0][:name]
    assert_equal 'sally', json[:users][1][:name]
  end

  test 'show a user in JSON for admins' do
    sign_in @admin
    get user_url(@sally, format: :json)
    json = json_response

    assert_equal 'sally', json[:name]
    assert_equal 'sally@example.com', json[:email]
    assert_equal 'author', json[:role]
  end

  test 'show a user in JSON for non-admins' do
    get user_url(@sally, format: :json)
    json = json_response

    assert_equal 'sally', json[:name]
    assert_nil json[:email]
  end
end
