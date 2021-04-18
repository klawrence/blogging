import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'
import {Editor} from 'posts/Editor'

describe('The post editor', () => {
  test('displays a form', () => {
    const component = display(<Editor />)
    assert_select(component, '.title')
    assert_select(component, '.body')
  })
})

