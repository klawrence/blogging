import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'

import {Application} from 'application/Application'

import {server} from 'remote/server'

describe('The application', () => {
  server.send = jest.fn()

  beforeEach( () => {
    const post = {
      id: 1,
      title: 'React on Rails',
      body: 'I can use React with Rails.',
    }
    server.send.mockReturnValue(post)
  })

  test('shows the first blog post', async () => {
    const component = await display(<Application />)

    assert_select(component, '.site-name',   'Blogging')
    assert_select(component, '.post .title', 'React on Rails')
    assert_select(component, '.post .body',  'I can use React with Rails.')
  })
})