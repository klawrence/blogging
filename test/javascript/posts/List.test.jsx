import React from 'react'
import {display, assert_select, resolveAllPromises, displayConnected} from '../helpers/ReactHelper'

import {server} from 'remote/server'
import ConnectedList, {List} from 'posts/List'
import {Store} from 'posts/Store'

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
    store = new Store()
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
