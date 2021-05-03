import React from 'react'
import {display, assert_select, displayConnected} from '../helpers/ReactHelper'

import {server} from 'react-to-rails/server'

import ConnectedUser from 'users/user'
import {User} from 'users/User'

describe('The user component', () => {
  server.send = jest.fn()

  const user = {
    id: 1,
    name: 'Sally',
    email: 'sally@example.com',
  }

  test('shows the user details', () => {
    const component = display(<User user={user}/>)
    assert_select(component, '.user .name', 'Sally')
    assert_select(component, '.user .email',  'sally@example.com')
  })

  test('fetches a user from the server', async () => {
    server.send.mockReturnValue(user)

    const component = await displayConnected(<ConnectedUser id={1}/>)

    assert_select(component, '.user .name', 'Sally')
    expect(server.send).toBeCalledWith('/users/1.json')
  })
})
