require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = Post.create! title: 'The title', body: 'The body.'
  end

  test 'should get index' do
    get posts_url
    assert_response :success
  end

  test 'fetch a post as json' do
    get post_url(@post, format: :json)
    assert_response :success

    json = JSON.parse response.body, symbolize_names: true
    assert_equal @post.id, json[:id]
    assert_equal 'The title', json[:title]
    assert_equal 'The body.', json[:body]
  end

end
