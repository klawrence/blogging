require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'sign in renders a form' do
    get sign_in_url
    assert_response :success

    assert_select 'form' do
      assert_select '#credentials_email'
      assert_select '#credentials_password'
      assert_select 'input.submit'
    end
  end
end
