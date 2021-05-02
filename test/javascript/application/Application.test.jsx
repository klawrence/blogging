import React from 'react'
import {display, assert_select, resolveAllPromises} from '../helpers/ReactHelper'

import {Application} from 'application/Application'

import {server} from 'remote/server'

describe('The application', () => {
  server.send = jest.fn()

  const post = {
    id: 1,
    title: 'React on Rails',
    body: 'I can use React with Rails.',
  }

  const posts = [post]

  beforeEach( () => {
    server.send.mockReturnValue({posts})
  })

  test('shows a list of blog posts', async () => {
    const component = await display(<Application />)

    await resolveAllPromises()
    component.update()

    assert_select(component, '.site-name',   'Blogging')
    assert_select(component, '.post .title', 'React on Rails')
    assert_select(component, '.post .body',  'I can use React with Rails.')

    expect(server.send).toBeCalledWith('/posts.json')
  })
})
