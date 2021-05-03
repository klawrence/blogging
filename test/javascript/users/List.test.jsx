import React from 'react'
import {display, assert_select, displayConnected} from '../helpers/ReactHelper'

import Store from 'react-to-rails/store'
import {server} from 'react-to-rails/server'
import ConnectedList, {List} from 'users/List'

describe('The user list', () => {
  server.send = jest.fn()
  let store

  const user = {
    id: 1,
    name: 'Sally',
    email: 'sally@example.com',
  }

  const users = [user]

  beforeEach( () => {
    store = new Store('user')
  })

  test('shows a list of users', () => {
    const component = display(<List users={users}/>)

    assert_select(component, '.users-list .user', 1)
    assert_select(component, '.user .name', 'Sally')
    assert_select(component, '.user .email',  'sally@example.com')
  })

  test('fetches the list of users from the server', async () => {
    server.send.mockReturnValue({users})

    const component = await displayConnected(<ConnectedList store={store} />)

    assert_select(component, '.users-list .user', 1)
    expect(server.send).toBeCalledWith('/users.json')
  })

  test('updates the list when a user is added to the store', async () => {
    server.send.mockReturnValue({users: []})

    const component = await displayConnected(<ConnectedList store={store} />)
    assert_select(component, '.user', 0)

    store.addAndNotify(user)
    component.update()
    assert_select(component, '.user', 1)
  })
})
