import React from 'react'
import Editor from '../posts/Editor'
import {create} from '../posts/api'
import List from '../posts/List'

export function Main() {
  return <div id='main'>
    <Editor onSubmit={create}/>
    <List />
  </div>
}