import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'

import {server} from 'remote/server'
import {List} from 'posts/List'
import ConnectedList from 'posts/List'

describe('The post list', () => {
  server.send = jest.fn()

  const post = {
    id: 1,
    title: 'React on Rails',
    body: 'I can use React with Rails.',
  }

  const posts = [post]

  test('shows a list of blog posts', async () => {
    const component = await display(<List posts={posts}/>)

    assert_select(component, '.posts-list .post', 1)
    assert_select(component, '.post .title', 'React on Rails')
    assert_select(component, '.post .body',  'I can use React with Rails.')
  })

  test('fetches the list of blog posts from the server', async () => {
    server.send.mockReturnValue({posts})

    const component = await display(<ConnectedList />)
    component.update()

    assert_select(component, '.posts-list .post', 1)
    expect(server.send).toBeCalledWith('/posts.json')
  })
})
