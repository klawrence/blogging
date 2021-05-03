import React from 'react'
import {store} from './store'
import {connectView} from '../react-to-rails/components/ConnectedView'

export function User({user}) {
  return <div className='user'>
    <h2 className='name'>{user.name}</h2>
    <div className='email'>{user.email}</div>
  </div>
}

export default connectView(User, store)
