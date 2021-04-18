import React from 'react'
import Editor from '../posts/Editor'
import Post from '../posts/Post'
import {create} from '../posts/api'

export function Main() {
  return <div id='main'>
    <Editor onSubmit={create}/>
    <Post id={1} />
  </div>
}