require "test_helper"

class UserTest < ActiveSupport::TestCase
  test 'create a user' do
    user = User.create! name: 'Sally',
                        email: 'sally@example.com',
                        role: :author

    assert_equal 'Sally', user.name
    assert_equal 'sally@example.com', user.email
    assert_equal 'author', user.role
  end

  test 'validate user attributes' do
    user = User.new name: 'S', email: 'sally'
    refute user.valid?
    assert_equal ["is too short (minimum is 2 characters)", "is invalid"], user.errors[:name]
    assert_equal ["is invalid"], user.errors[:email]
  end
end
