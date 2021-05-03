import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'
import Editor from 'posts/Editor'
import Store from 'react-to-rails/store'
import {server} from 'react-to-rails/server'
import {signIn, signOut} from 'users/current_user'

describe('The post editor', () => {
  server.send = jest.fn()

  beforeEach( () => {
    signIn()
  })

  afterEach( () => {
    signOut()
  })

  test('displays a form', () => {
    const component = display(<Editor />)
    assert_select(component, '.title')
    assert_select(component, '.body')
  })

  test('updates the post details', async () => {
    const store = new Store('post')
    const component = display(<Editor store={store} />)

    const title = component.find('.title')
    const body = component.find('.body')
    const form = component.find('form')

    title.simulate('change', {target: {name: 'title', value: 'The title'}})
    body.simulate('change',  {target: {name: 'body', value: 'The body'}})

    const new_post = {
      title: 'The title',
      body: 'The body',
    }

    server.send.mockReturnValue({id: 123, ...new_post})

    form.simulate('submit')
    expect(server.send).toBeCalledWith('/posts.json', 'post', {post: new_post})
  })

})

