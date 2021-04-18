import React from 'react'
import Editor from '../posts/Editor'
import Post from '../posts/Post'

export function Main() {
  return <div id='main'>
    <Editor />
    <Post id={1} />
  </div>
}