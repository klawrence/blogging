import React from 'react'
import ReactDOM from 'react-dom'
import {Application} from './Application'
import {signIn} from '../users/current_user'

document.addEventListener('DOMContentLoaded', () => {
  const react = document.querySelector('#react')
  signIn(react.getAttribute('data-user-id'))

  ReactDOM.render(
      <Application />,
      react.appendChild(document.createElement('div'))
  )
})