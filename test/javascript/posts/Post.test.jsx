import React from 'react'
import {display, assert_select, resolveAllPromises, displayConnected} from '../helpers/ReactHelper'

import {Post} from 'posts/Post'
import ConnectedPost from 'posts/Post'
import {server} from 'remote/server'

describe('The post component', () => {
  server.send = jest.fn()

  const post = {
    id: 1,
    title: 'The title',
    body: 'The body.',
  }

  test('shows a blog post', () => {
    const component = display(<Post post={post}/>)
    assert_select(component, '.post .title', 'The title')
    assert_select(component, '.post .body',  'The body.')
  })

  test('fetches a post from the server', async () => {
    server.send.mockReturnValue(post)

    const component = await displayConnected(<ConnectedPost id={1}/>)

    assert_select(component, '.post .title', 'The title')
    expect(server.send).toBeCalledWith('/posts/1.json')
  })
})
