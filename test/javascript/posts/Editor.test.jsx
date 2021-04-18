import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'
import Editor from 'posts/Editor'

describe('The post editor', () => {
  test('displays a form', () => {
    const component = display(<Editor />)
    assert_select(component, '.title')
    assert_select(component, '.body')
  })

  test('updates the post details', () => {
    const submit = jest.fn()
    const component = display(<Editor onSubmit={submit} />)

    const title = component.find('.title')
    const body = component.find('.body')
    const form = component.find('form')

    title.simulate('change', {target: {name: 'title', value: 'The title'}})
    body.simulate('change',  {target: {name: 'body', value: 'The body'}})
    form.simulate('submit')

    const expected = {
      title: 'The title',
      body: 'The body',
    }
    expect(submit).toBeCalledWith(expected)
  })

})

