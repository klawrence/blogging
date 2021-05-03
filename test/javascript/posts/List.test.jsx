import React from 'react'
import {display, assert_select, displayConnected} from '../helpers/ReactHelper'

import Store from 'react-to-rails/store'
import {server} from 'react-to-rails/server'
import ConnectedList, {List} from 'posts/List'

describe('The post list', () => {
  server.send = jest.fn()
  let store

  const post = {
    id: 1,
    title: 'React on Rails',
    body: 'I can use React with Rails.',
  }

  const posts = [post]

  beforeEach( () => {
    store = new Store('post')
  })

  test('shows a list of blog posts', () => {
    const component = display(<List posts={posts}/>)

    assert_select(component, '.posts-list .post', 1)
    assert_select(component, '.post .title', 'React on Rails')
    assert_select(component, '.post .body',  'I can use React with Rails.')
  })

  test('fetches the list of blog posts from the server', async () => {
    server.send.mockReturnValue({posts})

    const component = await displayConnected(<ConnectedList store={store} />)

    assert_select(component, '.posts-list .post', 1)
    expect(server.send).toBeCalledWith('/posts.json')
  })

  test('updates the list when a post is added to the store', async () => {
    server.send.mockReturnValue({posts: []})

    const component = await displayConnected(<ConnectedList store={store} />)
    assert_select(component, '.post', 0)

    store.addAndNotify(post)
    component.update()
    assert_select(component, '.post', 1)
  })
})
