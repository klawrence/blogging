require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = Post.create! title: 'The title', body: 'The body.'
  end

  test 'the index page just returns the react application' do
    get posts_url
    assert_select '#react'
  end

  test 'fetch a list of posts as json' do
    get posts_url(format: :json)
    assert_response :success
    json = JSON.parse response.body, symbolize_names: true

    assert 1, json[:posts].count
    assert 'The title', json[:posts][0][:title]
  end

  test 'fetch a post as json' do
    get post_url(@post, format: :json)
    assert_response :success

    json = JSON.parse response.body, symbolize_names: true
    assert_equal @post.id, json[:id]
    assert_equal 'The title', json[:title]
    assert_equal 'The body.', json[:body]
  end

  test 'create a blog post' do
    post posts_url(format: :json), params: {
        post: {
            title: 'A new day',
            body: 'First post!'
        }
    }
    assert_response :success
    json = JSON.parse response.body, symbolize_names: true

    # The post was created
    @post = Post.last
    assert_equal 'A new day', @post.title

    # Return the post as JSON
    assert_equal @post.id, json[:id]
    assert_equal 'A new day', json[:title]
  end

end
