require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sally = create_user 'Sally', password: 'letmein'
  end

  test 'sign in renders a form' do
    get sign_in_url
    assert_response :success

    assert_select 'form' do
      assert_select '#credentials_email'
      assert_select '#credentials_password'
      assert_select 'input.submit'
    end
  end

  test 'redirect to home page after sign in' do
    post sessions_url, params: {
        credentials: {
            email: 'sally@example.com',
            password: 'letmein',
        }
    }
    assert_redirected_to root_url
  end

  test 'rerender the form if sign in fails' do
    post sessions_url, params: {
        credentials: {
            email: 'sally@wrong.com',
            password: 'wrong',
        }
    }
    assert_response :success

    assert_select '.form' do
      assert_select '.error', 'Invalid Login'
      assert_select '#credentials_email' do |elements|
        assert_equal 'sally@wrong.com', elements[0][:value]
      end
    end
  end
end
