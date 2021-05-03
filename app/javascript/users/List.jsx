import React from 'react'
import {store} from './store'
import {connectList} from '../react-to-rails/components/ConnectedList'
import {User} from './User'

export function List({users}) {
  return <ul className='users-list'>
    {
      users.map(user => <li key={user.id}>
        <User user={user}/>
      </li>)
    }
  </ul>
}

export default connectList(List, store)