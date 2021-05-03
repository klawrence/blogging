require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sally = create_user 'Sally'
    @post = Post.create! title: 'The title', body: 'The body.'
  end

  test 'the index page just returns the react application' do
    get posts_url
    assert_select '#react'
  end

  test 'include the current user id if signed in' do
    sign_in @sally
    get posts_url
    assert_select '#react' do |elements|
      assert_equal @sally.id.to_s, elements[0]['data-user-id']
    end
  end

  test 'fetch a list of posts as json' do
    get posts_url(format: :json)
    json = json_response

    assert 1, json[:posts].count
    assert 'The title', json[:posts][0][:title]
  end

  test 'fetch a post as json' do
    get post_url(@post, format: :json)
    json = json_response

    assert_equal @post.id, json[:id]
    assert_equal 'The title', json[:title]
    assert_equal 'The body.', json[:body]
  end

  test 'create a blog post requires a sign in' do
    post posts_url(format: :json), params: {
        post: {
            title: 'A new day',
            body: 'First post!'
        }
    }
    assert_redirected_to root_url
  end

  test 'create a blog post' do
    sign_in @sally
    post posts_url(format: :json), params: {
        post: {
            title: 'A new day',
            body: 'First post!'
        }
    }
    json = json_response

    # The post was created
    @post = Post.last
    assert_equal 'A new day', @post.title

    # Return the post as JSON
    assert_equal @post.id, json[:id]
    assert_equal 'A new day', json[:title]
  end

end
