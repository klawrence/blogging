import React from 'react'
import {store} from './store'
import {connectView} from '../react-to-rails/components/ConnectedView'

export function Post({post}) {
  return <div className='post'>
    <h2 className='title'>{post.title}</h2>
    <div className='body'>{post.body}</div>
  </div>
}

export default connectView(Post, store)
