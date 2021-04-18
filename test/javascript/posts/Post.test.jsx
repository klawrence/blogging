import React from 'react'
import {display, assert_select} from '../helpers/ReactHelper'

import {Post} from 'posts/Post'

describe('The post component', () => {
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
})
