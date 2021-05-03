import React from 'react'
import {store} from './store'
import {Post} from './Post'
import {connectList} from '../react-to-rails/components/ConnectedList'

export function List({posts}) {
  return <ul className='posts-list'>
    {
      posts.map(post => <li key={post.id}>
        <Post post={post}/>
      </li>)
    }
  </ul>
}

export default connectList(List, store)